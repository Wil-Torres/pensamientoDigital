import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styles: []
})
export class EquiposComponent implements OnInit {
  grupo: any[] = [];
  detalleGrupo: any[] = [];

  constructor() { }

  ngOnInit() {
    this.objInit();
  }
  objInit() {
    this.grupo = [
      {id:1, grupo: 'A', integrantes: [{clave: 1, nombre: 'FULANO'},{clave: 2, nombre: 'MENGANO'},{clave: 3, nombre: 'PENSEJO', punteo: 50}]},
      {id:2, grupo: 'B', integrantes: [{clave: 4, nombre: 'FULANO'},{clave: 5, nombre: 'MENGANO'},{clave: 6, nombre: 'PENSEJO', punteo: 20}]},
      {id:3, grupo: 'C', integrantes: [{clave: 7, nombre: 'FULANO'},{clave: 8, nombre: 'MENGANO'},{clave: 9, nombre: 'PENSEJO'}]},
      {id:4, grupo: 'D', integrantes: [{clave: 10, nombre: 'FULANO'},{clave: 11, nombre: 'MENGANO'},{clave: 12, nombre: 'PENSEJO'}]},
    ]
  }
  seleccionarDetalle(item:any){
    this.detalleGrupo = item;
  }

}
