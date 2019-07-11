import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/services/service.index';
import { ClasesService } from '../../clases.service';

@Component({
  selector: 'app-nueva-discucion-modal',
  templateUrl: './nueva-discucion-modal.component.html',
  styles: []
})
export class NuevaDiscucionModalComponent implements OnInit {
  private _forma: FormGroup;
  usuario: any = {};
  private datoCurso: any = {};
  private _discucion: EventEmitter<any>;

  public get discucion(): EventEmitter<any> {
    return this._discucion;
  }
  public set discucion(v: EventEmitter<any>) {
    this._discucion = v;
  }
  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }
  constructor(public modalRef: BsModalRef, private builder: FormBuilder, private usr: AuthService,
    private srvCurso: ClasesService) {
    this.discucion = new EventEmitter<any>();
    this.objInit()
    this.usr.user.subscribe(resp => {
      this.usuario.displayName = resp.displayName;
      this.usuario.email = resp.email;
      this.usuario.photoURL = resp.photoURL;
      this.usuario.uid = resp.uid;
    })
  }

  ngOnInit() { }

  objInit() {
    this._forma = this.builder.group({
      id: null,
      refTarget: null,
      refNombre: null,
      asunto: null,
      creadoPor: this.usuario,
      fechaCreacion: new Date(),
      discusion: [[]]
    })
  }

  alCambiar() {
    let fase1 = this.forma.value.asunto;
    var res = fase1.replace(" ", "").toLocaleLowerCase();
    this.forma.patchValue({
      id: res,
      refTarget: `#${res}`,
      refNombre: `${res}`,
    });
  }

  guardar(discucion: any) {
    this.srvCurso.addDiscucion(this.datoCurso.curso, this.datoCurso.leccion, this.forma.getRawValue()).then( res => {
      res.update({id:res.id, $key: res.id}).then( resp => {
        this.discucion.emit({ creado: true});
        this.modalRef.hide();
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  }
  cancelar(discucion: any) {
    this.modalRef.hide();
  }



}
