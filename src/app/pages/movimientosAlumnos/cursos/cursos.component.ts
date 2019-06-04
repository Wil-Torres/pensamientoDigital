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
  objeto: any = {}


  constructor(@Inject(DOCUMENT) private _document, private alumno: AlumnoService) {
    alumno.inicializar();
  }

  ngOnInit() {
    this.initObj();


  }

  ngOnDestroy() {
    this.alumno.destruir();
  }

  mostrar(item: number) {
    let recuadro = document.getElementById("#recuadro");
    switch (item) {
      case 1:
        this.seleccion = 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0'
        this._document.getElementById('recuadro').setAttribute('src', this.seleccion);
        break;
      case 2:
        this.seleccion = 'https://camsolutionsgt.blogspot.com/'
        this._document.getElementById('recuadro').setAttribute('src', this.seleccion);
        break;
      case 3:
        this.seleccion = 'https://www.um.es/docencia/barzana/DAWEB/Lenguaje-de-programacion-JavaScript-1.pdf'
        this._document.getElementById('recuadro').setAttribute('src', this.seleccion);
        break;

      default:
        this.seleccion = 'https://www.lawebdelprogramador.com/pdf/files/1532804764_manual-javascript-19.jpg'
        this._document.getElementById('recuadro').setAttribute('src', this.seleccion);
        break;
    }
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
          videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI"
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
          videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI"
        },
        {
          codigoContenido: 2,
          nombreContenido: "Asynchronous JavaScript",
          videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI"
        },
        {
          codigoContenido: 3,
          nombreContenido: "Run to Completion and the Event Loop",
          videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI"
        },
        {
          codigoContenido: 4,
          nombreContenido: "Summary",
          videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI"
        }
        ],
        videoUrlContenido: ""
      },
      {
        codigoContenido: 2, refTarget: '#tema2', refNombre: 'tema2', documento: "no hay",
        nombreContenido: "Introducing Promises",
        subTemas: [
          { codigoContenido: 1, nombreContenido: "Basic Usage", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 2, nombreContenido: "Multiple Consumers", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 3, nombreContenido: "Promise States", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 4, nombreContenido: "Chaining Promises", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 5, nombreContenido: "Callback Execution Order", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 6, nombreContenido: "Basic Error Propagation", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 7, nombreContenido: "The Promise API", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 8, nombreContenido: "Summary", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
        ],
        videoUrlContenido: "https://www.youtube.com/watch?v=ye21CYdhm1s"
      },
      {
        codigoContenido: 3, refTarget: '#tema3', refNombre: 'tema3', documento: "no hay",
        nombreContenido: "Working with Standard Promises",
        subTemas: [
          { codigoContenido: 1, nombreContenido: "The Async Ripple Effect", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 2, nombreContenido: "Conditional Logic", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 3, nombreContenido: "Parallel Execution", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 4, nombreContenido: "Sequential Execution Using Loops or Recursion", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 5, nombreContenido: "Managing Latency", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 6, nombreContenido: "Functional Composition", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
          { codigoContenido: 7, nombreContenido: "Summary", videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" },
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


  }

}




