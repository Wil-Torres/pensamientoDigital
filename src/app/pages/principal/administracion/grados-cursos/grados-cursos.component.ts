import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../administracion.service';
import { CatalogoService } from '../../catalogo/catalogo.service';
import { isNil } from 'lodash';
import swal from 'sweetalert';
import { ActivatedRoute, Router } from '@angular/router';

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
  tempCursosAsignados: any = {};
  tempCursosAsignados2: any[] = [];
  gradoId: string = this.Aroute.snapshot.paramMap.get('id');

  constructor(private srvAdmin: AdministracionService, private srvCatalogo: CatalogoService,
    private router: Router, private Aroute: ActivatedRoute) {
    this.srvAdmin.getGradosSecciones().subscribe(grados => {
      this.objGrados = grados;
    })

    this.srvCatalogo.obtenerCategorias().then(resp => {
      this.categoria = resp;
    });

  }

  ngOnInit() {
    if ( !isNil(this.gradoId)) {
      this.srvAdmin.getCursosGrado(this.gradoId).subscribe(grado => {
        this.tempCursosAsignados2 = grado;
      })
    }
  }

  validar() {
    if ( isNil(this.cursoId)) {
      return {error: true, mensaje: 'Falta seleccionar curso'};
    } 
    if ( isNil(this.categoriaId)) {
      return {error: true, mensaje: 'Falta seleccionar la categoria del curso'};
    } 
    if ( isNil(this.gradoId)) {
      return {error: true, mensaje: 'Seleccionar grado:'};
    } 
    return {error: false, mensaje: ''};
  }

  asignar() {
    let curso = this.cursos.find((element:any) => this.cursoId === element.id);
    let xy = null
    let catalogo = this.categoria.find((element:any) => { 
      let x = element.detalle.find(sElement => {
        return this.categoriaId === sElement.id
      })
      xy = x;
      return x;
    });
    catalogo = xy;
    let valida = this.validar();
    if( valida.error){
      swal('Ocurrio un error',valida.mensaje,'error');
      return;
    }
    this.tempCursosAsignados = {curso, catalogo, cursoId: curso.id, catalogoId: catalogo.id, obligatorio: true, docente: 'Wilson Torres', idioma: 'Español', id:null};

    this.srvAdmin.postCursoGrado(this.gradoId, this.tempCursosAsignados).then(asignado => {
      asignado.update({id: asignado.id}).then(resp => {
        swal('Nuevo registro','Agregado exitosamente', 'success')
      });
    }).catch(err => {
      swal('Ocurrio un error',err, 'error')
    })

    
  }

  seleccionarCurso(id: string){
    this.srvCatalogo.obtenerCursos(id).then(resp => {
      resp.subscribe(lista => {
        this.cursos = lista
      })
    })
  }

}
