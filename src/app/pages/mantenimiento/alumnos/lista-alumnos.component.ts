import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosService } from './alumnos.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styles: []
})
export class ListaAlumnosComponent implements OnInit {
  listaAlumnos: any = [];
  numeroRegistro: number;
  constructor(private srvAlumno: AlumnosService, private router: Router) {
  }

  ngOnInit() {
    this.buscar();
  }

  buscar(offset: number = 0, limit: number = 100) {
    this.srvAlumno.getAlumnos(offset, limit).then(prof => {
      prof.subscribe(resp => {
        this.listaAlumnos = resp
        this.numeroRegistro = this.srvAlumno.paginacion.totalRegistros;
      })
    })

  }
  nuevo() {
    this.router.navigate(['alumno/nuevo']);
  }
  edicion(id: string) {
    this.router.navigate(['alumno', id]);
  }
}
