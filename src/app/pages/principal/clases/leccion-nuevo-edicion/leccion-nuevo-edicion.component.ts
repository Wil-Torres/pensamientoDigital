import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNil, cloneDeep } from 'lodash'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasesService } from '../clases.service';
import swal from 'sweetalert';
import { CoreService } from 'src/app/services/service.index';
import { UserInfo } from 'src/app/interfaces/login';

@Component({
  selector: 'app-leccion-nuevo-edicion',
  templateUrl: './leccion-nuevo-edicion.component.html',
  styles: [`
  .noVisible{
    visibility: hidden !important;
  }  
  `]
})
export class LeccionNuevoEdicionComponent implements OnInit {
  private _objetoId: any = this.router.snapshot.paramMap.get('id');
  private _cursoId: any = this.router.snapshot.paramMap.get('curso');
  private _forma : FormGroup;

  public get forma() : FormGroup {

    return this._forma;
  }
  public set forma(v : FormGroup) {

    this._forma = v;
  }
  

  constructor(private builder: FormBuilder, public router: ActivatedRoute, public srvCurso: ClasesService,
    public srvCore: CoreService) { 
    this._forma = this.builder.group({
      id: null,
      imagen: null,
      titulo: [null, [Validators.required]],
      fechaInicio: [new Date(), [Validators.required]],
      fechaFin: [new Date(), [Validators.required]],
      descripcion: null,
      avance: null,
      estado: null,
      categoria: null,
      idioma: null,
      creditos: null,
      secciones: [[]],
      contenido: [[]],
      test: [[]],
      discuciones: [[]],
      equipo: [[]],
      biblioteca: [[]],
      encuesta: [[]],
      archivos: [[]],
    });
  }

  ngOnInit() {
    let selectores: any = document.getElementsByClassName('selector');
    let panelCentral: any = document.getElementById('panelCentral');
    panelCentral.classList.remove('col-md-10');
    panelCentral.classList.add('col-md-12');
    let panelDerecho: any = document.getElementById('panelDerecho');
    panelDerecho.classList.add('noVisible');
    //panelDerecho.parentNode.removeChild(panelDerecho);
    this.obtenerLeccion();

    
  }
  ngOnDestroy () {
    let panelDerecho: any = document.getElementById('panelDerecho');
    panelDerecho.classList.remove('noVisible');

    let panelCentral: any = document.getElementById('panelCentral');
    panelCentral.classList.remove('col-md-12');
    panelCentral.classList.add('col-md-10');
  }

  guardar () {
    this.srvCore.lock()
    const enviar = cloneDeep(this._forma.getRawValue());
    const peticion = isNil(enviar.id) ? 'post' : 'nativePut';
    this.srvCurso.updateLeccion(this._cursoId, this.forma.getRawValue()).then(() => {
      this.srvCore.unlock();
      swal('Actualización', 'Actualizacion exitosa', 'success').then(() => {});
    }).catch(err => {
      this.srvCore.unlock();
      swal('Ocurrio un error', err, 'success').then(() => {});
      
    })
  }
  obtenerLeccion(){
    this.srvCore.lock();
    let lesson = this.srvCurso.getLeccion(this._cursoId, this._objetoId).subscribe((leccion:any) => {
      leccion.fechaFin = leccion.fechaFin.toDate();
      leccion.fechaInicio = leccion.fechaInicio.toDate();
      this.forma.patchValue(leccion, {emitEvent:true});
      this.srvCore.unlock();
      lesson.unsubscribe();
    })
    
  }

}
