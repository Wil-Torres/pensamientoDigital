export interface Leccion {
  id: string,
  imagen: string; //'../../../../../assets/images/Nueva carpeta/descarga.svg',
  titulo: string; //'JAVASCRIPT ASINCRONO',
  fechaInicio: Date; //'14/01/2018',
  fechaFin: Date; //'31/01/2018',
  descripcion: string; //'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
  secciones: [];
  contenido: [];
  test: []; // contestar test en linea
  discuciones: []; // discute un tema y gana puntos por contestar
  equipo: []; // agrupar alumnos en equipos y calificar esfuerzo en conjunto
  biblioteca: []; // añadir trabajdo existentes
  encuesta: []; // realiza una encuesta en linea
  archivos: []
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isNil } from 'lodash';
import { ClasesService } from '../clases.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalNuevaLeccionComponent } from '../componentes/modal-nueva-leccion/modal-nueva-leccion.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styles: []
})
export class ClaseComponent implements OnInit {

  private _objeto: any[] = [];
  curso: any;
  private _objetoId: string = this.aRoute.snapshot.paramMap.get('id');
  modalRef: BsModalRef | null;

  public get objetoId(): string {
    return this._objetoId;
  }
  public set objetoId(v: string) {
    this._objetoId = v;
  }
  public get objeto(): any[] {
    return this._objeto;
  }
  public set objeto(v: any[]) {
    this._objeto = v;
  }



  constructor(private router: Router, private aRoute: ActivatedRoute, private srvCurso: ClasesService,
    private modalService: BsModalService) {
    if (!isNil(this.objetoId)) {
      this.objInit();
    }

  }

  ngOnInit() { }

  objInit() {
    this.objeto = [
      {
        id: 1,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'JAVASCRIPT ASINCRONO',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },
      {
        id: 2,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'INTRODUCING PROMISES',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },
      {
        id: 3,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'INTRODUCCION AL CURSO 3',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },
      {
        id: 4,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'INTRODUCCION AL CURSO 4',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },
      {
        id: 5,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'INTRODUCCION AL CURSO 5',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },
      {
        id: 6,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'INTRODUCCION AL CURSO 6',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },
      {
        id: 7,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'DESARROLLO APLICACIONES MOVILES 1',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },
      {
        id: 8,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'DESARROLLO APLICACIONES MOVILES 2',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },
      {
        id: 9,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'DESARROLLO APLICACIONES MOVILES 3',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },
      {
        id: 10,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'DESARROLLO APLICACIONES MOVILES 4',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },
      {
        id: 11,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'DESARROLLO APLICACIONES MOVILES 5',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },
      {
        id: 12,
        imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
        titulo: 'UNIDAD DE REFUERZO',
        fechaInicio: '14/01/2018',
        fechaFin: '31/01/2018',
        descripcion: 'Refuerzo al estudiante para el siguiente ciclo escolar',
        secciones: [],
        contenido: [],
        test: [], // contestar test en linea
        discuciones: [], // discute un tema y gana puntos por contestar
        equipo: [], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
        biblioteca: [], // añadir trabajdo existentes
        encuesta: [], // realiza una encuesta en linea
        archivos: [] // subir archivos a la nube
      },

    ]
    this.obtenerCursos();
  }

  obtenerCursos() {
    let y = this.srvCurso.getLecciones(this.objetoId).subscribe((lecciones: any) => {
      this.objeto = lecciones
      y.unsubscribe();
    })
  }

  mostrarLeccion(item: string) {
    this.router.navigate(['/clase/' + this.objetoId + '/leccion/', item]);
  }

  agregarDetalles() {
    const initialState = { objetoId: this.objetoId };
    this.modalRef = this.modalService.show(ModalNuevaLeccionComponent, { class: 'modal-sm', initialState });
    let leccionTemp = this.modalRef.content.leccion.subscribe((leccion: any) => {
      if (leccion.actualizado) {
        swal('Creacion de Lección', 'Se ha creado la lección ' + leccion.leccion.titulo, 'success').then(() => {
          this.obtenerCursos();
          leccionTemp.unsubscribe();
        });
      } else {
        leccionTemp.unsubscribe();
      }
    });
  }
}
