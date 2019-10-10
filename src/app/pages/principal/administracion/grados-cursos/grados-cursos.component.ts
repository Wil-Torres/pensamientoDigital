import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../administracion.service';
import { CatalogoService } from '../../catalogo/catalogo.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-grados-cursos',
  templateUrl: './grados-cursos.component.html',
  styles: []
})
export class GradosCursosComponent implements OnInit {
  objGrados: any[] = []
  categoria: any[] = []
  cursos: any = [];
  categoriaId: string;
  cursoId: string;
  tempCursosAsignados: any[] = [];

  constructor(private srvAdmin: AdministracionService, private srvCatalogo: CatalogoService) {
    this.srvAdmin.getGradosSecciones().subscribe(grados => {
      this.objGrados = grados;
    })

    this.srvCatalogo.obtenerCategorias().then(resp => {
      this.categoria = resp;
      console.log(this.categoria);
    });

  }

  ngOnInit() {
  }

  asignar() {
    let curso = this.cursos.find((element:any) => this.cursoId === element.id);
    let catalogo = this.categoria.find((element:any) => this.categoriaId === element.id);

    this.tempCursosAsignados.push({curso, catalogo, obligatorio: true, docente: 'Wilson Torres', idioma: 'Español'});
  }

  seleccionarCurso(id: string){
    console.log(id)
    this.srvCatalogo.obtenerCursos(id).then(resp => {
      resp.subscribe(lista => {
        this.cursos = lista
      })
    })
  }

}
