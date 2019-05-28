import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discuciones',
  templateUrl: './discuciones.component.html',
  styles: []
})
export class DiscucionesComponent implements OnInit {

  private _discuciones: any[] = [];
  envioMsn: string = '';
  public get discuciones(): any[] {
    return this._discuciones;
  }
  public set discuciones(v: any[]) {
    this._discuciones = v;
  }


  constructor() { }

  ngOnInit() {
    this.initObj();
  }

  initObj() {
    this.discuciones = [
      {
        "id": 1,
        "refTarget": "#tema1",
        "refNombre": "tema1",
        "asunto": "Explique sobre la teoria del universo",
        "creadoPor": "usuario xyz",
        "discusion": [
          { "comentario": "Una Galaxya", "usuario": "WT" },
          { "comentario": "Estas Equivocado es muchas Galaxias", "usuario": "GC" },
          { "comentario": "Podrias ampliar la info", "usuario": "WT" },
          { "comentario": "Con gusto", "usuario": "GC" }
        ]
      },
      {
        "id": 2,
        "refTarget": "#tema2",
        "refNombre": "tema2",
        "asunto": "Que libros recomiendan",
        "creadoPor": "usuario xyz",
        "discusion": [
          { "comentario": "Las Hijas del Capitan", "usuario": "WT" },
          { "comentario": "The Book Thief", "usuario": "GC" },
          { "comentario": "La Cabaña", "usuario": "WT" },
          { "comentario": "La Encrucijada", "usuario": "GC" }
        ]
      }
    ]
  }

  enviarMensaje(item: any) {
    this.discuciones[item].discusion.push({
      comentario: this.envioMsn,
      usuario: 'WT',
      fecha: new Date()
    });
  }

}
