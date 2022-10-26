import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasesService } from 'src/app/pages/principal/clases/clases.service';
import { ListaCursos } from 'src/app/pages/principal/clases/lista-clases/lista-clases.component';
import { AlumnoService } from '../../alumno.service';


@Component({
  selector: 'app-cursos-trabajos',
  templateUrl: './cursos-trabajos.component.html',
  styles: []
})
export class CursosTrabajosComponent implements OnInit {

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
    this.router.navigate(['/alumno-cursos-tareas', id]);
  }

  buscar(offset: number = 0, limit: number = 10) {
    this.srvCurso.ObtenerCursoUsuario(this.srvCurso.y).subscribe((res) => {
      this.numeroRegistro = res.length;
      let x = [];
      res.forEach((element: any) => {
        let elem = element.curso;
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
      this.objeto = x;
    });
  }
}
