import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NuevaDiscucionModalComponent } from './nueva-discucion-modal.component';
import { AuthService } from 'src/app/services/service.index';
import { Route, ActivatedRoute } from '@angular/router';
import { ClasesService } from '../../clases.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-discuciones',
  templateUrl: './discuciones.component.html',
  styles: []
})
export class DiscucionesComponent implements OnInit {

  private _discuciones: any[] = [];
  public get discuciones(): any[] {
    return this._discuciones;
  }
  public set discuciones(v: any[]) {
    this._discuciones = v;
  }

  private _objetoId: any = this.aRouter.snapshot.paramMap.get('id');
  private _cursoId: any = this.aRouter.snapshot.paramMap.get('curso');
  envioMsn: string = '';
  modalRef: BsModalRef | null;

  private _forma: FormGroup;
  private usuario: any = {}
  public get forma(): FormGroup {
    return this._forma;
  }
  @Input() public set forma(v: FormGroup) {
    this._forma = v;
  }
  constructor(private modalService: BsModalService, private usr: AuthService,
    private aRouter: ActivatedRoute, private srvCursos: ClasesService) {
    this.usr.user.subscribe(resp => {
      this.usuario.displayName = resp.displayName;
      this.usuario.email = resp.email;
      this.usuario.photoURL = resp.photoURL;
      this.usuario.uid = resp.uid;
    })
  }

  ngOnInit() {
    this.initObj();
  }

  initObj() {
    this.srvCursos.getDiscuciones(this._cursoId, this._objetoId).subscribe(discuciones => {
      this._discuciones = discuciones;
      this.discuciones.forEach(elem => {
        this.srvCursos.getPosts(this._cursoId, this._objetoId, elem.id).subscribe(posts => {
          elem.discusion = posts
        })
      })
    })
  }

  enviarMensaje(item: any) {
    this.srvCursos.addPosts(this._cursoId, this._objetoId, item.id, {
      comentario: this.envioMsn,
      usuario: this.usuario,
      fecha: new Date()
    }).then(resp => {
      resp.update({ id: resp.id, $key: resp.id }).then(() => { console.log('creado') });
    })
  }
  agregarDicusion() {
    const initialState = { datoCurso: { curso: this._cursoId, leccion: this._objetoId } };
    this.modalRef = this.modalService.show(NuevaDiscucionModalComponent, { class: 'modal-sm', initialState });
    let discucionTemp = this.modalRef.content.discucion.subscribe((discucion: any) => {
      if (discucion.creado) {
        swal('Creacion de Registro', 'Nuevo tema de discución creado', 'success').then(() => {
          this.srvCursos.sendNotification([{id:'9KprCpB7DoRHtorFuKfRpNKH6Cn1'}], {usuario:this.usuario, fecha:new Date(), mensaje: 'Hola que hace', title:'Nuevo Foro', read:false}).then(resp => {
            discucionTemp.unsubscribe();
          }).catch(err => {swal('Ocurrio un problema', err, 'error');});
          
        })
      }
    })

  }

}
