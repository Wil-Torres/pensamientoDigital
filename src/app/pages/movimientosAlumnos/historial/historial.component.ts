import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../alumno.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styles: []
})
export class HistorialComponent implements OnInit {

  constructor(private alumno: AlumnoService) {
    alumno.inicializar();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alumno.destruir();
  }

}
