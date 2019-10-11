import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { gradoSeccion, AdministracionService, Carrera } from '../administracion.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { isNil } from 'lodash';

@Component({
  selector: 'app-grados-secciones',
  templateUrl: './grados-secciones.component.html',
  styles: [`
  .w-40 {
		width: 40%!important;
  }
  `]
})
export class GradosSeccionesComponent implements OnInit {
  modalRef: BsModalRef | null;
  gradoEscolar: any = {};
  objCarreras: Carrera[];
  private _objGrados: gradoSeccion[] = [];
  private _cicloId: string = this.Aroute.snapshot.paramMap.get('id');
  public get objGrados(): gradoSeccion[] {
    return this._objGrados;
  }
  public set objGrados(v: gradoSeccion[]) {
    this._objGrados = v;
  }


  constructor(private modalService: BsModalService, private srvAdmin: AdministracionService,
    private router: Router, private Aroute: ActivatedRoute) { }

  ngOnInit() {
    this.srvAdmin.getGradosSecciones().subscribe(grados => {
      console.log(grados)
      this.objGrados = grados;
    })
    this.srvAdmin.getCarreras().subscribe(carreras => {
      this.objCarreras = carreras;
    })
  }

  agregarGrado() {
    let valida = this.validarGrado();
    if (valida.error) {
      swal('Error en validación', valida.mensaje, 'warning');
      return;
    }
    this.asignacion().then((nuevaGrado: gradoSeccion) => {
      if (isNil(nuevaGrado.id)) {
        this.srvAdmin.postGradoSeccion(nuevaGrado).then(resp => {
          this.gradoEscolar = {};
          resp.update({ id: resp.id }).then(gradoNew => {
            swal("Grado y Seccion Creados", 'exitosamente', 'success');
          })
        })
      } else {
        this.srvAdmin.putGradoSeccion(nuevaGrado).then(resp => {
          swal("Grado y Seccion Actualizado", 'exitosamente', 'success');
        })
      }

    })


  }

  asignarCursos(id: string) {
    this.router.navigate(['asignar-cursos-grado',id]);
  }
  asignarMaestro (id: string) {
    this.router.navigate(['asignar-maestros-grado',id]);
  }

  validarGrado() {
    let respuesta = { error: false, mensaje: '' }
    let existeGrado = this.objGrados.find(elem => {
      return ((this.gradoEscolar.gradoId === elem.gradoId) && (this.gradoEscolar.carreraId === elem.carreraId))
    })
    let existeSeccion
    if (existeGrado) {
      existeSeccion = existeGrado.seccion.find(elem => {
        return elem === this.gradoEscolar.seccion;
      })
    }

    if (existeSeccion) {
      return respuesta = { error: true, mensaje: ' La sección que desea ingresar ya existe' };
    }

    return respuesta;
  }

  asignacion() {

    return new Promise((resolve) => {

      let id = null;
      let existeCarrera = this.objGrados.find(elem => {
        return ((elem.carreraId === this.gradoEscolar.carreraId) && (elem.gradoId === this.gradoEscolar.gradoId));
      })
      if (existeCarrera) {
        id = existeCarrera.id;
        this.srvAdmin.getGradoSeccion(id).subscribe((elem: any) => {
          elem.seccion.push(this.gradoEscolar.seccion);
          resolve(elem);
        })
      } else {
        resolve({
          id: null,
          ciclo: this._cicloId,
          estado: 'A',
          carreraId: this.gradoEscolar.carreraId,
          carrera: this.gradoEscolar.carrera,
          gradoId: this.gradoEscolar.gradoId,
          seccion: [this.gradoEscolar.seccion],
          fechaCreacion: new Date(),
          usuarioId: this.srvAdmin.usuarioInfo.uid,
        })
      }

    })

  }

  seleccionarCarrera(id: string) {
    let x = this.objCarreras.find(elem => {
      return id === elem.id
    })

    if (x) {
      this.gradoEscolar.carrera = x;
    }
  }

}
