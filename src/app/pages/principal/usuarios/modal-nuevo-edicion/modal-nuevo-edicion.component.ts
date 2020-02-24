import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { UsuariosService } from '../usuarios.service';
import { User } from 'src/app/interfaces/login';
import swal from 'sweetalert';
declare var $;

@Component({
  selector: 'app-modal-nuevo-edicion',
  templateUrl: './modal-nuevo-edicion.component.html',
  styles: [`
  .bordes-tarea{
    border-left: blue;
    border-style: double;
    border-top: 0;
    border-bottom: 0;
    border-right: 0;
  }
  `]
})
export class ModalNuevoEdicionComponent implements OnInit {
  private _forma: FormGroup;
  private tipoUsuario: number;
  edicion: any;

  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }
  constructor(public modalRef: BsModalRef, private builder: FormBuilder,
    private srvUsers: UsuariosService) {
    this.objInit()

  }

  ngOnInit() {
    if (this.edicion) {
      if (this.edicion.tareaTitulo.length > 0) {
        this.forma.patchValue(this.edicion, { emitEvent: false });
      }
    } else {
      this.objInit()
    }
  }

  objInit() {
    this._forma = this.builder.group({
      id: null,
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      tipoCuenta: this.tipoUsuario,
      alias: [null, [Validators.required]],
      userId: [null, [Validators.required]],
      password: [null, [Validators.required]],

    })
  }

  guardarTarea() {
    let tempUser: User = {
      uid: null,
      email: this.forma.value.userId,
      displayName: this.forma.value.nombre + ' ' + this.forma.value.apellido,
      photoURL: 's',
      roles: {
        reader: true,
        author: false,
        student: this.forma.value.tipoCuenta === 0 ? true : false,
        parents: this.forma.value.tipoCuenta === 1 ? true : false,
        teacher: this.forma.value.tipoCuenta == 2 ? true : false,
        admin: this.forma.value.tipoCuenta == 3 ? true : false,
        invited: this.forma.value.tipoCuenta == 4 ? true : false
      },
      phoneNumber: '12345678',
      password: this.forma.value.password
    }
    this.srvUsers.agregarUsuario(tempUser).then((resp:any) => {
      swal('Creacion de Usuario', 'Se ha creado la usuario exitosamente.', 'success').then(() => {
      });
    }).catch(err => {
      swal('Ocurrio un Problema', 'Inconvenientes al agregar usuario.', 'danger').then(() => { });
    })
    this.modalRef.hide();
  }

  cancelar() {
    this.modalRef.hide();
  }



}
