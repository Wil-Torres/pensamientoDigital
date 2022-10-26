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

  private _listaAlumnos: any[];
  public get listaAlumnos(): any[] {
    return this._listaAlumnos;
  }
  public set listaAlumnos(v: any[]) {
    this._listaAlumnos = v;
  }

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
    this.srvCursos.obtenerAlumnosNotificar(this._cursoId).subscribe((resp) => {
      this.listaAlumnos = resp
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
    if (this.envioMsn.length === 0) {
      return;
    }
    this.srvCursos.addPosts(this._cursoId, this._objetoId, item.id, {
      comentario: this.envioMsn,
      usuario: this.usuario,
      fecha: new Date()
    }).then(resp => {
      resp.update({ id: resp.id, $key: resp.id }).then(() => {
        this.limpiar();
      });
    })
  }
  limpiar() {
    this.envioMsn = '';
  }
  agregarDicusion() {
    const initialState = { datoCurso: { curso: this._cursoId, leccion: this._objetoId } };
    this.modalRef = this.modalService.show(NuevaDiscucionModalComponent, { class: 'modal-sm', ignoreBackdropClick: true, initialState });
    let discucionTemp = this.modalRef.content.discucion.subscribe((discucion: any) => {
      if (discucion.creado) {
        console.log(discucion);
        swal('Creacion de Registro', 'Nuevo tema de discución creado', 'success').then(() => {
          this.srvCursos.sendNotification(this.listaAlumnos, { usuario: this.usuario, fecha: new Date(), mensaje: discucion.noti.asunto, title: 'Nuevo Foro', read: false, origenId:discucion.noti.id }).then(resp => {
            discucionTemp.unsubscribe();
          }).catch(err => { swal('Ocurrio un problema', err, 'error'); });

        })
      }
    })

  }

  deshacerSeleccion() { }
  editarTarea() { }
  borrarTarea() { }


}
