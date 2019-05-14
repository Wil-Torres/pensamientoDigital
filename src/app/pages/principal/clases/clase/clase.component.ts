import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styles: []
})
export class ClaseComponent implements OnInit {
  
  private _objeto : any[] = [];
  public get objeto() : any[] {
    return this._objeto;
  }
  public set objeto(v : any[]) {
    this._objeto = v;
  }
  
  

  constructor(private router: Router) { }

  ngOnInit() {
    this.objInit();
  }

  objInit () {
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
  }

  mostrarLeccion(){
    this.router.navigate(['/clases/leccion/', 1]);
  }

}
