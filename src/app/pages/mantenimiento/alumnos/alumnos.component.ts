import { Component, OnInit } from '@angular/core';
import { AlumnosService } from './alumnos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../principal/usuarios/usuarios.service';
import { AuthService } from 'src/app/services/service.index';
import { UserInfo } from 'src/app/interfaces/login';
import { AdministracionService } from '../../principal/administracion/administracion.service';
import { pais, departamento, municipio } from 'src/app/interfaces/alumno';
import { isNil } from 'lodash';
import swal from 'sweetalert';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styles: [`
	.w-40 {
		width: 40%!important;
  }
	`]
})
export class AlumnosComponent implements OnInit {

  private _forma: FormGroup;
  private usuarioLog: UserInfo;
  private _objPais: pais[] = [];
  private _objDepartamento: departamento[] = [];
  private _objMunicipio: municipio[] = [];
  private objetoId = this.aRouter.snapshot.paramMap.get('id');

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

  constructor(private srvAlumno: AlumnosService, private builder: FormBuilder, 
    private srvAuth: AuthService, private aRouter: ActivatedRoute) {
    this.srvAuth.userInfo.subscribe(usuario => {
      this.usuarioLog = usuario;
    })

    if ( this.objetoId ){
      this.buscar();
    }

  }

  ngOnInit() {
    this.objInit();
  }

  guardar(): void {
    if (isNil(this.forma.value.id)) {
      this.srvAlumno.addAlumno(this.forma.value).then(rAlumno => {
        rAlumno.update({ id: rAlumno.id }).then(uAlumno => {
          swal('Actualización', 'Se ha acutalizado exitosamene', 'success')
        }).catch(err => {
          swal('Ocurrio un problema', err, 'error')
        })
      }).catch(err => {
        swal('Ocurrio un problema', err, 'error')
      });
    } else {
      this.srvAlumno.updateAlumno(this.forma.value).then(uAlumno => {
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
      facebook: [null, Validators.required],
      email: [null, Validators.required],
      skype: [null, Validators.required],
      datosMadre: this.builder.group({
        nombres: [null, Validators.required],
        apellidos: [null, Validators.required],
        identificacion: [null, Validators.required],
        parentescoId: [null, Validators.required],
        telefonoCasa: [null, Validators.required],
        telefonoMovil: [null, Validators.required],
      }),
      datosPadre: this.builder.group({
        nombres: [null, Validators.required],
        apellidos: [null, Validators.required],
        identificacion: [null, Validators.required],
        parentescoId: [null, Validators.required],
        telefonoCasa: [null, Validators.required],
        telefonoMovil: [null, Validators.required],
      }),
      datosUsuario: this.builder.group({
        id: null,
        userId: null,
        password: null,
      }),
      paralelo: [null, Validators.required],
      jornada: [null, Validators.required],
    })
  };

  buscar() {

    this.srvAlumno.getAlumno(this.objetoId).subscribe(alumno => {
      this.forma.patchValue(alumno, {emitEvent:false});
    })

  }
}
