import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from '../alumno.service';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styles: []
})
export class ListaCursosComponent implements OnInit {


  private _objeto: any[] = [];
  public get objeto(): any[] {
    return this._objeto;
  }
  public set objeto(v: any[]) {
    this._objeto = v;
  }


  constructor(private router: Router, private alumno: AlumnoService) {
    alumno.inicializar();
  }

  ngOnInit() {
    this.initObj();
  }

  ngOnDestroy() {
    this.alumno.destruir();
  }

  initObj() {
    this.objeto = [
      { id: 1, titulo: 'Matematica 1', descripcion: 'descipcion de la clase asignada segun el ciclo de estudio Matematica', imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg', },
      { id: 2, titulo: 'Estudios Sociales 1', descripcion: 'descipcion de la clase asignada segun el ciclo de estudio Estudios', imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg', },
      { id: 3, titulo: 'Elementos de Fisica Quimica', descripcion: 'descipcion de la clase asignada segun el ciclo de estudio Elementos', imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg', },
      { id: 4, titulo: 'Ingles Ocupacional 1', descripcion: 'descipcion de la clase asignada segun el ciclo de estudio Ingles', imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg', },
      { id: 5, titulo: 'Moral y Etica Profesional', descripcion: 'descipcion de la clase asignada segun el ciclo de estudio Moral', imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg', },
      { id: 6, titulo: 'Formacion Musical', descripcion: 'descipcion de la clase asignada segun el ciclo de estudio Formacion', imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg', },
      { id: 7, titulo: 'Educación Fisica 1', descripcion: 'descipcion de la clase asignada segun el ciclo de estudio Educación', imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg', },
      { id: 8, titulo: 'Dibujo Tecnico', descripcion: 'descipcion de la clase asignada segun el ciclo de estudio Dibujo', imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg', },
      { id: 9, titulo: 'Tecnologia Vocacional 1', descripcion: 'descipcion de la clase asignada segun el ciclo de estudio Tecnologia', imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg', },
      { id: 10, titulo: 'Practica de Taller 1', descripcion: 'descipcion de la clase asignada segun el ciclo de estudio Practica', imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg', },
    ]
  }

  mostrarCurso() {
    this.router.navigate(['/alumno/cursos']);
  }



}
