import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-marca-nuevo',
  templateUrl: './marca-nuevo-edicion.component.html',
  styleUrls: ['./marca-nuevo-edicion.component.css']
})
export class MarcaNuevoComponent implements OnInit {
  estado: string = 'Nuevo';
  objeto: any = {}

  constructor() { }

  ngOnInit() {
  }

  guardar () {
    alert('hola');
  }

  validar () {}

}
