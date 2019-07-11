import { Component, OnInit } from '@angular/core';
import { AlumnosService } from './alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styles: []
})
export class AlumnosComponent implements OnInit {

  constructor(private srvAlumno: AlumnosService) { }

  ngOnInit() {
    this.guardar();
  }

  guardar (): void {}

}
