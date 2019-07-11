import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap';
import { ClasesService } from '../../clases.service';
import swal from 'sweetalert'
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-nueva-clase',
  templateUrl: './modal-nueva-clase.component.html',
  styleUrls: ['./modal-nueva-clase.component.css']
})
export class ModalNuevaClaseComponent implements OnInit {

  private _forma: FormGroup;
  private _clase: EventEmitter<any>;
  public get clase(): EventEmitter<any> {
    return this._clase;
  }
  public set clase(v: EventEmitter<any>) {
    this._clase = v;
  }

  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }

  constructor(public modalRef: BsModalRef, private builder: FormBuilder, private srvClase: ClasesService,
    private router: Router) {
    this.clase = new EventEmitter<any>();
    this.objInit()
  }

  ngOnInit() {
  }
  objInit() {
    this._forma = this.builder.group({
      id: null,
      $key: null,
      clase: [null, [Validators.required]],
      estiloCursoId: [null, [Validators.required]],
      codigoAcceso: [null, [Validators.required]],
      fechaInicio: [null, [Validators.required]],
      fechaFin: [null, [Validators.required]],
      catedra: [null, [Validators.required]],
      grado: [null, [Validators.required]],
      idioma: [null, [Validators.required]],
      zonaHoraria: [null, [Validators.required]],
      curso: null,
      seccion: null,
      semestre: null,
      creditos: null,
      escalaCalificacion: [null, [Validators.required]],
      cantidadEstudiantes: 0,
      detalle_Lecciones: [[]],
    })
  }
  guardar() {
    this.srvClase.addCursos(this.forma.getRawValue()).then(curso => {
      curso.update({ id: curso.id, $key: curso.id }).then(actualizado => {
        swal('Creacion de Curso', 'Se ha creado el curso  ' + this.forma.value.clase, 'success').then(() => {
          this.clase.emit({ clase: this.forma.getRawValue() });
          this.modalRef.hide();
          this.router.navigate(['/clase/' + curso.id+ '/lecciones/'])
        })
      });
    })
  }
  cancelar() {
    this.modalRef.hide();
  }

}
