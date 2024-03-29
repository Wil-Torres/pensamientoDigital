import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/service.index';
import { UserInfo } from 'src/app/interfaces/login';
import { pais, departamento, municipio } from 'src/app/interfaces/alumno';
import { isNil } from 'lodash';
import swal from 'sweetalert';
import { ProfesoresService } from './profesores.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styles: []
})
export class ProfesoresComponent implements OnInit {

  private _forma: FormGroup;
  private usuarioLog: UserInfo;
  objetoId = this.aRouter.snapshot.paramMap.get('id');
  private _objPais: pais[] = [];
  private _objDepartamento: departamento[] = [];
  private _objMunicipio: municipio[] = [];

  public get objMunicipio(): municipio[] {
    return this._objMunicipio;
  }
  public set objMunicipio(v: municipio[]) {
    this._objMunicipio = v;
  }
  public get objDepartamento(): departamento[] {
    return this._objDepartamento;
  }
  public set objDepartamento(v: departamento[]) {
    this._objDepartamento = v;
  }
  public get objPais(): pais[] {
    return this._objPais;
  }
  public set objPais(v: pais[]) {
    this._objPais = v;
  }
  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }

  constructor(private srvProfesor: ProfesoresService, private builder: FormBuilder,
    private srvAuth: AuthService, private aRouter: ActivatedRoute, private router: Router) {
    this.srvAuth.userInfo.subscribe((usuario: UserInfo) => {
      this.usuarioLog = usuario;
    })

    if (!isNil(this.objetoId)) {
      this.buscar();
    }
  }

  ngOnInit() {
    this.objInit();
  }

  guardar(): void {
    if (isNil(this.forma.value.id)) {
      this.srvProfesor.addProfesor(this.forma.value).then(rProfe => {
        this.srvAuth.signUp(this.forma.get('datosUsuario.userId').value, this._forma.get('datosUsuario.password').value, {
          teacher: true
        }).then(newUser => {
          this._forma.patchValue({ id: rProfe.id, datosUsuario: { id: rProfe.id } });
          rProfe.update({ 
              id: rProfe.id, 
              datosUsuario: { 
                id: rProfe.id ,
                userId: this.forma.get('datosUsuario.userId').value,
                password: this._forma.get('datosUsuario.password').value
              }
            }).then((uProfe) => {
            swal('Nuevo Registro', 'Se ha creado exitosamene', 'success').then(() => {
              this.router.navigate(['profesores', rProfe.id]);
            })
          }).catch(err => {
            swal('Ocurrio un problema', err, 'error')
          })
        }).catch(err => {
          swal('Ocurrio un problema al crear el usuario para la plataforma', err, 'error')
        })

      }).catch(err => {
        swal('Ocurrio un problema', err, 'error')
      });
    } else {
      this.srvProfesor.updateProfesor(this.forma.value).then(uProfe => {
        swal('Actualización', 'Se ha acutalizado exitosamene', 'success')
      }).catch(err => {
        swal('Ocurrio un problema', err, 'error')
      })
    }

  }

  objInit() {
    this._forma = this.builder.group({
      id: null,
      cui: [null, Validators.required],
      primerNombre: [null, Validators.required],
      segundoNombre: null,
      otrosNombres: null,
      primerApellido: [null, Validators.required],
      segundoApellido: null,
      otrosApellidos: null,
      fechaNacimiento: [null, Validators.required],
      departamenoNacimientoId: [null, Validators.required],
      departamenoNacimiento: this.builder.group({
        id: null,
        departamento: null,
        paisId: null,
      }),
      municipioNacimientoId: [null, Validators.required],
      municipioNacimiento: this.builder.group({
        id: null,
        municipio: null,
        departamentoId: null
      }),
      direccionNacimiento: [null, Validators.required],
      departamentoResidenciaId: [null, Validators.required],
      departamentoResidencia: this.builder.group({
        id: null,
        departamento: null,
        paisId: null,
      }),
      municipioResidenciaId: [null, Validators.required],
      municipioResidencia: this.builder.group({
        id: null,
        municipio: null,
        departamentoId: null
      }),
      direccionResidencia: [null, Validators.required],
      generoId: [null, Validators.required],
      nacionalidadId: [null, Validators.required],
      nacionalidad: this.builder.group({
        id: null,
        pais: null
      }),
      lateralidadId: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      telefono: [null, Validators.required],
      telefonoEmergencia: [null, Validators.required],
      email: [null, Validators.required],
      datosUsuario: this.builder.group({
        id: null,
        userId: null,
        password: null
      }),
      fechaCreacion: new Date(),
      fechaModificacion: null,
      perfilCreaId: null,
      perfilCrea: null,
      perfilModificaId: null,
      perfilModifica: null,
      establecimiento: this.builder.group({
        fechaInicio: null,
        puesto: null,
        fechaJubilacion: null
      }),
      informacionAcademica: this.builder.group({
        titulo: null,
        nombreEstablecimiento: null
      })
    })
  };

  buscar() {
    this.srvProfesor.getProfesor(this.objetoId).subscribe(profe => {
      this.forma.patchValue(profe, { emitEvent: false });
    })
  }

  actualizar() {
    this.buscar();
  }

  limpiar() {
    this._forma.reset();
  }

  eliminar() {
    this.srvProfesor.removeProfesor(this._forma.getRawValue()).then(() => {
      this.router.navigate(['profesores']);
    }).catch(err => {
      swal('Ocurrio un problema', err, 'error')
    });
  }
}
