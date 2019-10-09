import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from './profesores.service';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styles: []
})
export class ListaProfesoresComponent implements OnInit {
  listaProfesor: any = [];
  numeroRegistro: number;
  constructor(private srvProfesor: ProfesoresService) { }

  ngOnInit() {
    this.buscar();
  }

  buscar(offset:number =0, limit: number = 10) {        
    this.srvProfesor.getProfesores(offset, limit).then(prof => {
      prof.subscribe(resp => {
        this.listaProfesor = resp
        this.numeroRegistro = this.srvProfesor.paginacion.totalRegistros;
        console.log(resp)
        console.log(this.srvProfesor.paginacion.totalRegistros)
      })
    })

  }

}
