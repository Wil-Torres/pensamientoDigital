import { Component, OnInit } from '@angular/core';
import { ListaCurso } from 'src/app/interfaces/listadoCurso';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  
  private _listadoCursos : ListaCurso[] = [];
  public get listadoCursos() : ListaCurso[] {
    return this._listadoCursos;
  }
  public set listadoCursos(v : ListaCurso[]) {
    this._listadoCursos = v;
  }
  
  constructor() { }

  ngOnInit() {
    this.listadoCursos.push(
      {id: 1, descripcion: 'Curso 1', icono: '', categoria: 'Computacion',estudiantes: 25, seleccion: false},
      {id: 2, descripcion: 'Curso 2', icono: '', categoria: 'Computacion',estudiantes: 10, seleccion: true},
      {id: 3, descripcion: 'Curso 3', icono: '', categoria: 'Computacion',estudiantes: 35, seleccion: false},
      {id: 4, descripcion: 'Curso 4', icono: '', categoria: 'Computacion',estudiantes: 5, seleccion: true},
      {id: 5, descripcion: 'Curso 5', icono: '', categoria: 'Computacion',estudiantes: 22, seleccion: false},
      {id: 6, descripcion: 'Curso 6', icono: '', categoria: 'Computacion',estudiantes: 86, seleccion: true},
      {id: 7, descripcion: 'Curso 7', icono: '', categoria: 'Computacion',estudiantes: 15, seleccion: false},
      {id: 8, descripcion: 'Curso 8', icono: '', categoria: 'Computacion',estudiantes: 9, seleccion: true},
      {id: 9, descripcion: 'Curso 9', icono: '', categoria: 'Computacion',estudiantes: 30, seleccion: false},
      {id: 10, descripcion: 'Curso 10', icono: '', categoria: 'Computacion',estudiantes: 78, seleccion: true}
    )
  }

}
