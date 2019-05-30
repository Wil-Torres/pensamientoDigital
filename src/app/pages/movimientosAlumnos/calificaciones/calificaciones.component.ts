import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../alumno.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styles: []
})
export class CalificacionesComponent implements OnInit {

  private _objeto: any = {};
  public get objeto(): any {
    return this._objeto;
  }
  public set objeto(v: any) {
    this._objeto = v;
  }


  constructor(private alumno: AlumnoService) {
    alumno.inicializar();
  }

  ngOnDestroy() {
    this.alumno.destruir();
  }

  ngOnInit() {
    this.initObj();
  }

  initObj() {
    this.objeto = {
      aprendizaje: [
        { id: 1, materia: 'Matematica 1', bimestre1: 100, bimestre2: 100, bimestre3: 100, bimestre4: 100, notaFinal: 100 },
        { id: 2, materia: 'Estudios Sociales 1', bimestre1: 90, bimestre2: 90, bimestre3: 90, bimestre4: 90, notaFinal: 90 },
        { id: 3, materia: 'Elementos de Fisica Quimica', bimestre1: 75, bimestre2: 98, bimestre3: 50, bimestre4: 70, notaFinal: 90 },
        { id: 4, materia: 'Ingles Ocupacional 1', bimestre1: 1, bimestre2: 0, bimestre3: 5, bimestre4: 0, notaFinal: 6 },
        { id: 5, materia: 'Moral y Etica Profesional', bimestre1: 100, bimestre2: 100, bimestre3: 100, bimestre4: 100, notaFinal: 100 },
        { id: 6, materia: 'Formacion Musical', bimestre1: 90, bimestre2: 90, bimestre3: 90, bimestre4: 90, notaFinal: 68 },
        { id: 7, materia: 'Educación Fisica 1', bimestre1: 75, bimestre2: 98, bimestre3: 50, bimestre4: 70, notaFinal: 90 },
        { id: 8, materia: 'Dibujo Tecnico', bimestre1: 1, bimestre2: 0, bimestre3: 5, bimestre4: 0, notaFinal: 6 },
        { id: 9, materia: 'Tecnologia Vocacional 1', bimestre1: 100, bimestre2: 100, bimestre3: 100, bimestre4: 100, notaFinal: 100 },
        { id: 10, materia: 'Practica de Taller 1', bimestre1: 90, bimestre2: 90, bimestre3: 90, bimestre4: 90, notaFinal: 90 },
      ],
      afectivo: [
        { id: 1, aspecto: 'Conducta en Aula', bimestre1: 100, bimestre2: 100, bimestre3: 100, bimestre4: 100, notaFinal: 68 },
        { id: 2, aspecto: 'Puntualidad', bimestre1: 90, bimestre2: 90, bimestre3: 90, bimestre4: 90, notaFinal: 90 },
        { id: 3, aspecto: 'Cumplimento', bimestre1: 75, bimestre2: 98, bimestre3: 50, bimestre4: 70, notaFinal: 90 },
        { id: 4, aspecto: 'Inasistencias', bimestre1: 1, bimestre2: 0, bimestre3: 5, bimestre4: 0, notaFinal: 6 }
      ]
    }
  }

}
