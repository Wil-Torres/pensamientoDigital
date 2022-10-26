import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/service.index';
import { UserInfo } from 'src/app/interfaces/login';
import { pais, departamento, municipio, inscripcion } from 'src/app/interfaces/alumno';
import { isNil, clone } from 'lodash';
import swal from 'sweetalert';
import { Ciclo, gradoSeccion, AdministracionService } from '../administracion.service';
import { AlumnosService } from 'src/app/pages/mantenimiento/alumnos/alumnos.service';
import { UsuariosService } from '../../usuarios/usuarios.service';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styles: []
})
export class InscripcionComponent implements OnInit {

  private _forma: FormGroup;
  private usuarioLog: UserInfo;
  private _objCiclo: Ciclo[] = [];
  private _objCarrera: gradoSeccion[] = [];
  private _objPais: pais[] = [];
  private _objDepartamento: departamento[] = [];
  private _objMunicipio: municipio[] = [];
  cicloAnterior: any = {};
  alumnosAnteriores: any[] = [];

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
  public get objCarrera(): gradoSeccion[] {
    return this._objCarrera;
  }
  public set objCarrera(v: gradoSeccion[]) {
    this._objCarrera = v;
  }
  public get objCiclo(): Ciclo[] {
    return this._objCiclo;
  }
  public set objCiclo(v: Ciclo[]) {
    this._objCiclo = v;
  }
  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }

  constructor(private srvAlumno: AlumnosService, private builder: FormBuilder,
    private srvUsers: UsuariosService, private srvAuth: AuthService, private srvAdmin: AdministracionService) {
    this.srvAuth.userInfo.subscribe(usuario => {
      this.usuarioLog = usuario;
    })

  }

  ngOnInit() {
    this.objInit();
    this.inicializar();
  }

  inicializar() {
    this.srvAdmin.getCiclos().subscribe(resp => {
      this.objCiclo = resp
    });
    this.srvAdmin.getGradosSecciones().subscribe(resp => {
      this.objCarrera = resp
    });


  }

  mostrarAnteriores() {
    if (isNil(this.cicloAnterior.cicloId) || isNil(this.cicloAnterior.gradoId)) {
      return
    }
    this.srvAdmin.getInscripciones(this.cicloAnterior).subscribe(resp => {
      this.alumnosAnteriores = resp;
    })
  }

  seleccionarAnterior(anterior: inscripcion) {
    if (isNil(this.forma.value.cicloId) || isNil(this.forma.value.gradoId)) {
      swal('Verificar datos', 'Debe seleccionar un ciclo, un grado y una seccion', 'warning').then(() => {
        return;
      })
      return;
    }
    if ((anterior.cicloId === this.forma.value.cicloId) ||
      (anterior.ciclo.ciclo > this.forma.value.ciclo.ciclo) ||
      (anterior.ciclo.ciclo < (this.forma.value.ciclo.ciclo - 1))) {
      swal('Verificar datos', 'El ciclo debe ser el anterior al de la nueva inscripcion, no puede ser igual, y tampoco mayor', 'warning').then(() => {
        return;
      })
      return;
    }
    if ((anterior.gradoId === this.forma.value.gradoId) ||
      (Number(anterior.grado.gradoId) > Number(this.forma.value.grado.gradoId)) ||
      (Number(anterior.grado.gradoId) < (Number(this.forma.value.grado.gradoId) - 1))) {
      swal('Verificar datos', 'El grado debe ser el anterior al de la nueva inscripcion, no puede ser igual, y tampoco mayor', 'warning').then(() => {
        return;
      })
      return;
    }
    let temp = clone(anterior);
    temp.cicloId = this.forma.value.cicloId;
    temp.ciclo = this.forma.value.ciclo;
    temp.gradoId = this.forma.value.gradoId;
    temp.grado = this.forma.value.grado;
    temp.fechaCreacion = new Date();
    temp.id = null;
    this._forma.patchValue(temp, { emitEvent: false });
    this.inscribir();


  }

  inscribir(): void {
    if (isNil(this.forma.value.alumnoId)) {
      this.srvAlumno.addAlumno(this.forma.value.alumno).then(rAlumno => {
        this._forma.patchValue({ alumnoId: rAlumno.id });
        this.srvAuth.signUp(this.forma.get('alumno.datosUsuario.userId').value, this._forma.get('alumno.datosUsuario.password').value, {
          student: true,
        }).then((newUser) => {
          this._forma.patchValue({
            id: rAlumno.id,
          });
          rAlumno.update({
            id: rAlumno.id, datosUsuario: {
              id: rAlumno.id,
              userId: this.forma.get('alumno.datosUsuario.userId').value,
              password: this._forma.get('alumno.datosUsuario.password').value
            }
          }).then(uAlumno => {
            // verificar que el limite de alumnos por seccion. 
            this.srvAdmin.postInscripcion(this.forma.value).then(rInscripcion => {
              this._forma.patchValue({ id: rInscripcion.id });
              rInscripcion.update({ id: rInscripcion.id }).then(async () => {

                swal('Inscripción', 'Se ha registrado exitosamene', 'success')
                // aqui se debe agregar la asignacion de cursos al alumno
                // obtener los cursos que estan asociados al grado y seccion.
                let asignado = await this.srvAdmin.obtenerCursosGracdo(this._forma.getRawValue(), this._forma.value.gradoId)
                if (asignado) {
                  this._forma.reset();
                  swal('Asinacion de cursos', 'Se han asignado los cursos al usuario', 'success')
                } else {
                  swal('Ocurrio un problema', 'Error en la asignacion de cursos', 'error')
                }
              }).catch(err => {
                swal('Ocurrio un problema', err, 'error')
              });
            }).catch(err => {
              swal('Ocurrio un problema', err, 'error')
            })
          }).catch(err => {
            swal('Ocurrio un problema', err, 'error')
          })

        }).catch(() => {
          swal('Ocurrio un error', 'Ocurrio un error al momento de crear el usuario virtual', 'error');
        })

      }).catch(err => {
        swal('Ocurrio un problema', err, 'error')
      });
    } else {
      this.srvAdmin.postInscripcion(this.forma.value).then(rInscripcion => {
        rInscripcion.update({ id: rInscripcion.id }).then(() => {
          this._forma.reset();
          this.cicloAnterior = {};
          swal('Inscripción', 'Se ha registrado exitosamene', 'success')
        });
      }).catch(err => {
        swal('Ocurrio un problema', err, 'error')
      });
    }

  }

  objInit() {
    this._forma = this.builder.group({
      id: null,
      alumnoId: [null, Validators.required],
      alumno: this.builder.group({
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
      }),
      cicloId: [null, Validators.required],
      ciclo: this.builder.group({
        id: null,
        ciclo: null,
        estado: null,
        fechaCreacion: null,
        usuarioId: null,
      }),
      gradoId: [null, Validators.required],
      grado: this.builder.group({
        id: null,
        ciclo: null,
        estado: null,
        carreraId: null,
        carrera: null,
        gradoId: null,
        grado: null,
        seccion: [[]],
        fechaCreacion: null,
        usuarioId: null,
      }),
      estadoId: [null, Validators.required],
      estado: this.builder.group({
        id: null,
        estado: null
      }),
      fechaCreacion: new Date(),
      perfilCreaId: null,
      perfilCrea: this.builder.group({
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
      }),
      fechaModificacion: null,
      perfilModificaId: null,
      perfilModifica: this.builder.group({
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
      })
    })
  }

  seleccionarCiclo(id: string) {
    let cicloTemp = this.objCiclo.find(elem => {
      return id === elem.id
    })

    if (cicloTemp) {
      this._forma.patchValue({ ciclo: cicloTemp })
    }
  }
  seleccionarGrado(id: string) {
    let gradoTemp = this.objCarrera.find(elem => {
      return id === elem.id
    })

    if (gradoTemp) {
      this._forma.patchValue({ grado: gradoTemp });
    }
  }

}
