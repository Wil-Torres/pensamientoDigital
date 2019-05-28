import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styles: []
})
export class CursosComponent implements OnInit {
  seleccion: string = '';
  objeto: any = {}


  constructor(@Inject(DOCUMENT) private _document) {

  }

  ngOnInit() {
    this.initObj();
    let selectores: any = document.getElementsByClassName('selector');
    let panelCentral: any = document.getElementById('panelCentral');
    panelCentral.classList.remove('col-md-10');
    panelCentral.classList.add('col-md-12');
    let panelDerecho: any = document.getElementById('panelDerecho');
    panelDerecho.classList.add('noVisible');
    //panelDerecho.parentNode.removeChild(panelDerecho);

  }

  ngOnDestroy() {
    let panelDerecho: any = document.getElementById('panelDerecho');
    panelDerecho.classList.remove('noVisible');

    let panelCentral: any = document.getElementById('panelCentral');
    panelCentral.classList.remove('col-md-12');
    panelCentral.classList.add('col-md-10');


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
         codigoContenido: 1,
         refTarget: '#tema1',
         refNombre: 'tema1',
         documento: "no hay", 
         nombreContenido: "Introduccion a Javascript", 
         subTemas: [{ 
           codigoContenido: 1, 
           nombreContenido: "Conceptos Basicos", 
           videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" 
          }], 
         videoUrlContenido: "https://www.youtube.com/watch?v=ye21CYdhm1s" 
      },{
        codigoContenido: 2, 
        documento: "Si hay", 
        nombreContenido: "Promesas y Subscribes", 
        refTarget: '#tema2',
        refNombre: 'tema2',
        subTemas: [{ 
          codigoContenido: 1, 
          nombreContenido: "Promesas", 
          videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" 
         },{ 
          codigoContenido: 2, 
          nombreContenido: "Promises All", 
          videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" 
         },{ 
          codigoContenido: 3, 
          nombreContenido: "Estados de Promesas", 
          videoUrlContenido: "https://www.youtube.com/watch?v=PY_pZNjJOPI" 
         }], 
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
