import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: []
})
export class TestComponent implements OnInit {

  private _trabajos: any[] = [];
  public get trabajos(): any[] {
    return this._trabajos;
  }
  public set trabajos(v: any[]) {
    this._trabajos = v;
  }


  constructor() { }

  ngOnInit() {
    this.objInit()
  }

  objInit() {
    this.trabajos = [
      {
        trabajoId: 1, tarea: 'Quiz de 5 y 6 unidad', comenzar: '20/05/2019', seleccionar: true,
        fechaLimite: '21/05/2019', asignado: true, puntuacionMaxima: 100, porcentaje: 8.3, calificacion: 27
      },
      {
        trabajoId: 2, tarea: 'Parcial 2da Unidad', comenzar: '20/05/2019',seleccionar: false,
        fechaLimite: '27/05/2019', asignado: true, puntuacionMaxima: 100, porcentaje: 8.3, calificacion: 27
      },
      {
        trabajoId: 3, tarea: 'Presentacion de Trabajo', comenzar: '22/05/2019',seleccionar: true,
        fechaLimite: '21/05/2019', asignado: false, puntuacionMaxima: 100, porcentaje: 8.3, calificacion: 27
      },
    ]
  }

}
