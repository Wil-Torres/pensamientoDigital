import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SidebarService } from 'src/app/services/service.index';
import { AlumnoService } from '../alumno.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styles: []
})
export class CursosComponent implements OnInit {
  seleccion: string = '';
  objeto: any = {};
  objBreadcrumb: any = {};
  unidad: number;
  leccion: number;
  contenido: number;
  seleccionado: any;
  seleccionContenido: any;


  constructor(@Inject(DOCUMENT) private _document, private alumno: AlumnoService) {
    alumno.inicializar();
    this.unidad = 0;
    this.leccion = 0;
    this.contenido = 0;
  }

  ngOnInit() {
    this.initObj();
  }

  marcar(raiz: any, marcado: any, obj: any, unidad: any, leccion: any) {
    this.seleccionado = raiz + marcado;
    this.objBreadcrumb = obj;
    this.unidad = unidad;
    this.leccion = leccion;
  }

  siguiente() {
    if ((this.leccion + 1) < this.objeto.contenido[this.unidad].subTemas.length) {
      if (this.objeto.contenido[this.unidad].subTemas[this.leccion].detalle.length === (this.contenido + 1)) {
        this.objeto.contenido[this.unidad].subTemas[this.leccion].visto = true;
        this.objeto.contenido[this.unidad].subTemas[this.leccion].detalle[this.contenido].visto = true;
        this.leccion = this.leccion + 1;
        this.contenido = 0
        this.leccionActual();
      } else {
        this.objeto.contenido[this.unidad].subTemas[this.leccion].detalle[this.contenido].visto = true;
        this.contenido = this.contenido + 1;
        this.mostrar(this.contenido);

      }

    } else if (this.objeto.contenido[this.unidad].subTemas.length === (this.leccion + 1)) {
      if (((this.leccion + 1) === this.objeto.contenido[this.unidad].subTemas.length) && ((this.unidad + 1) === this.objeto.contenido.length)) {
        this.objeto.contenido[this.unidad].subTemas[this.leccion].visto = true;
        this.objeto.contenido[this.unidad].subTemas[this.leccion].detalle[this.contenido].visto = true;
        console.log('llego al limite de cursos')
        return;
      }
      if (this.objeto.contenido[this.unidad].subTemas[this.leccion].detalle.length === (this.contenido + 1)) {
        this.objeto.contenido[this.unidad].subTemas[this.leccion].visto = true;
        this.objeto.contenido[this.unidad].subTemas[this.leccion].detalle[this.contenido].visto = true;
        this.unidad = this.unidad + 1
        this.leccion = 0
        this.contenido = 0;
        this.leccionActual();
      } else {
        this.objeto.contenido[this.unidad].subTemas[this.leccion].detalle[this.contenido].visto = true;
        this.contenido = this.contenido + 1;
        this.mostrar(this.contenido);
      }


    }
  }

  anterior() {
    if (this.leccion === 0) {
      if (this.leccion === 0 && this.unidad === 0 && this.contenido === 0) {
        console.log('llego al inicio de los cursos')
        return;
      } else if (this.contenido !== 0){
        this.contenido = this.contenido - 1
        this.mostrar(this.contenido);
        return;
      }
      if (this.contenido === 0) {
        this.unidad = this.unidad - 1
        this.leccion = (this.objeto.contenido[this.unidad].subTemas.length - 1);
        this.contenido = this.objeto.contenido[this.unidad].subTemas[this.leccion].detalle.length;
        this.leccionActual();
      } else {
        this.contenido = this.contenido - 1
        this.mostrar(this.contenido);
      }

    } else if (this.objeto.contenido[this.unidad].subTemas.length >= (this.leccion + 1)) {
      if (this.objeto.contenido[this.unidad].subTemas[this.leccion].detalle[this.contenido].length >= (this.contenido + 1)) {
        this.contenido = this.contenido - 1
        this.mostrar(this.contenido);
      } else {
        this.leccion = this.leccion - 1;
        this.leccionActual();
      }


    }

  }

  leccionActual() {
    this.seleccionado = this.objeto.contenido[this.unidad].refNombre +
      this.objeto.contenido[this.unidad].subTemas[this.leccion].codigoContenido
    this.mostrar(this.contenido);
  }

  ngOnDestroy() {
    this.alumno.destruir();
  }

  mostrar(item: number = 0) {
    let recuadro = document.getElementById("#recuadro");
    this.seleccionContenido = item;
    //this.seleccion = this.objeto.contenido[this.unidad].subTemas[this.leccion].videoUrlContenido;
    this.seleccion = this.objeto.contenido[this.unidad].subTemas[this.leccion].detalle[item].url;
    this._document.getElementById('recuadro').setAttribute('src', this.seleccion);

  }

  initObj() {
    this.objeto = {
      avanceCurso: 0,
      categoriaId: "2450",
      contenido: [{
        codigoContenido: 0,
        refTarget: '#tema0',
        refNombre: 'tema0',
        documento: "no hay",
        nombreContenido: "Preface",
        subTemas: [{
          codigoContenido: 1,
          nombreContenido: "Preface",
          videoUrlContenido: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0",
          detalle: [
            {
              url: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0", tipo: 0, visto: false
            },
            {
              url: "https://www.um.es/docencia/barzana/DAWEB/Lenguaje-de-programacion-JavaScript-1.pdf", tipo: 1, visto: false
            },
            {
              url: "https://camsolutionsgt.blogspot.com/", tipo: 2, visto: false
            },
            {
              url: "https://www.lawebdelprogramador.com/pdf/files/1532804764_manual-javascript-19.jpg", tipo: 3, visto: false
            },
            {
              url: "https://www.youtube.com/watch?v=Sj-KJdE1bNY", tipo: 0, visto: false
            },
          ],
          visto: false
        }],
        videoUrlContenido: ""
      },
      {
        codigoContenido: 1,
        refTarget: '#tema1',
        refNombre: 'tema1',
        documento: "no hay",
        nombreContenido: "Asynchronous JavaScript",
        subTemas: [{
          codigoContenido: 1,
          nombreContenido: "Callbacks",
          videoUrlContenido: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0",
          visto: false,
          detalle: [
            {
              url: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0", tipo: 0, visto: false
            },
            {
              url: "https://www.um.es/docencia/barzana/DAWEB/Lenguaje-de-programacion-JavaScript-1.pdf", tipo: 1, visto: false
            },
            {
              url: "https://camsolutionsgt.blogspot.com/", tipo: 2, visto: false
            },
            {
              url: "https://www.lawebdelprogramador.com/pdf/files/1532804764_manual-javascript-19.jpg", tipo: 3, visto: false
            },
            {
              url: "https://www.youtube.com/watch?v=Sj-KJdE1bNY", tipo: 0, visto: false
            },
          ],

        },
        {
          codigoContenido: 2,
          nombreContenido: "Asynchronous JavaScript",
          videoUrlContenido: "https://www.um.es/docencia/barzana/DAWEB/Lenguaje-de-programacion-JavaScript-1.pdf",
          visto: false,
          detalle: [
            {
              url: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0", tipo: 0, visto: false
            },
            {
              url: "https://www.um.es/docencia/barzana/DAWEB/Lenguaje-de-programacion-JavaScript-1.pdf", tipo: 1, visto: false
            },
            {
              url: "https://camsolutionsgt.blogspot.com/", tipo: 2, visto: false
            },
            {
              url: "https://www.lawebdelprogramador.com/pdf/files/1532804764_manual-javascript-19.jpg", tipo: 3, visto: false
            },
            {
              url: "https://www.youtube.com/watch?v=Sj-KJdE1bNY", tipo: 0, visto: false
            },
          ],
        },
        {
          codigoContenido: 3,
          nombreContenido: "Run to Completion and the Event Loop",
          videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
          visto: false
        },
        {
          codigoContenido: 4,
          nombreContenido: "Summary",
          videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
          visto: false
        }
        ],
        videoUrlContenido: ""
      },
      {
        codigoContenido: 2, refTarget: '#tema2', refNombre: 'tema2', documento: "no hay",
        nombreContenido: "Introducing Promises",
        subTemas: [
          {
            codigoContenido: 1, nombreContenido: "Basic Usage", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 2, nombreContenido: "Multiple Consumers", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 3, nombreContenido: "Promise States", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 4, nombreContenido: "Chaining Promises", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 5, nombreContenido: "Callback Execution Order", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 6, nombreContenido: "Basic Error Propagation", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 7, nombreContenido: "The Promise API", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 8, nombreContenido: "Summary", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
        ],
        videoUrlContenido: "https://www.youtube.com/watch?v=ye21CYdhm1s"
      },
      {
        codigoContenido: 3, refTarget: '#tema3', refNombre: 'tema3', documento: "no hay",
        nombreContenido: "Working with Standard Promises",
        subTemas: [
          {
            codigoContenido: 1, nombreContenido: "The Async Ripple Effect", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 2, nombreContenido: "Conditional Logic", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 3, nombreContenido: "Parallel Execution", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 4, nombreContenido: "Sequential Execution Using Loops or Recursion", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 5, nombreContenido: "Managing Latency", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 6, nombreContenido: "Functional Composition", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
          {
            codigoContenido: 7, nombreContenido: "Summary", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI",
            visto: false
          },
        ],
        videoUrlContenido: "https://www.youtube.com/watch?v=ye21CYdhm1s"
      }],
      creadorId: "-LBc8Ec75LMr6JAuGuJA",
      creditos: 100,
      cursoId: 1,
      estado: 0,
      idiomaId: 1,
      nombreCurso: "Javascript Avanzado",
      $id: "-Ld9_yln2z7iF78EPqqr",
    }
    this.leccionActual();

  }

}




