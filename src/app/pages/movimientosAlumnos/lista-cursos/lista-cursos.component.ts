import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from '../alumno.service';
import { ClasesService } from '../../principal/clases/clases.service';
import { ListaCursos } from '../../principal/clases/lista-clases/lista-clases.component';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styles: []
})
export class ListaCursosComponent implements OnInit {

  private _objeto: any[] = [];
  numeroRegistro: number;
  public get objeto(): any[] {
    return this._objeto;
  }
  public set objeto(v: any[]) {
    this._objeto = v;
  }


  constructor(private router: Router, private alumno: AlumnoService, private srvCurso: ClasesService) {
    alumno.inicializar();
  }

  ngOnInit() {
    this.initObj();
  }

  ngOnDestroy() {
    this.alumno.destruir();
  }

  initObj() {
    this.buscar();
  }

  mostrarCurso(id: string) {
    this.router.navigate(['/alumno/cursos', id]);
  }

  buscar(offset: number = 0, limit: number = 10) {
    this.srvCurso.getCursos(offset, limit).then((resp) => {
      resp.subscribe((res) => {
        this.numeroRegistro = res.length;
        let x = [];
        res.forEach((elem: ListaCursos) => {
          x.push({
            $key: elem.$key,
            cantidadEstudiantes: elem.cantidadEstudiantes,
            grado: elem.grado,
            id: elem.$key,
            seleccion: false,
            titulo: elem.clase,
            catedra: elem.catedra,
            lecciones: elem.lecciones,
            descripcion: 'descipcion de la clase asignada segun el ciclo de estudio Matematica',
            imagen: '../../../../../assets/images/Nueva carpeta/descarga.svg',
          })
        })
        console.log(x);
        this.objeto = x;
      });
    }).catch(err => {
      console.log(err.FirebaseError);
    })
  }
}
