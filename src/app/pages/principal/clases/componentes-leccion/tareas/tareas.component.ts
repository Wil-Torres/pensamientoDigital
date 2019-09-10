import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PARAMETERS } from '@angular/core/src/util/decorators';
declare var $;

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styles: [`
    .bordes-tarea{
      border-left: blue;
      border-style: double;
      border-top: 0;
      border-bottom: 0;
      border-right: 0;
    }
  `]
})
export class TareasComponent implements OnInit {
  private _forma: FormGroup;
  leccion: string;
  edicion: any;

  private _tarea: EventEmitter<any>;
  public get tarea(): EventEmitter<any> {
    return this._tarea;
  }
  public set tarea(v: EventEmitter<any>) {
    this._tarea = v;
  }

  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }
  constructor(public modalRef: BsModalRef, private builder: FormBuilder) {
    this.tarea = new EventEmitter<any>();
    this.objInit()
  }

  ngOnInit() {
    if (this.edicion) {
      if (this.edicion.tareaTitulo.length > 0) {
        this.forma.patchValue(this.edicion, { emitEvent: false });
      }
    } else {
      this.objInit()
    }
  }

  objInit() {
    this._forma = this.builder.group({
      id: null,
      tareaTitulo: [null, [Validators.required]],
      puntajeMaximo: [null, [Validators.required]],
      intentosMaximo: [1, [Validators.required]],
      tareaCategoria: [0, [Validators.required]],
      calificacionTarea: [0, [Validators.required]],
      fechaInicioTarea: [(new Date()).inicioMes(), [Validators.required]],
      fechaFinTarea: [(new Date()).finMes(), [Validators.required]],
      leccion: [this.leccion, [Validators.required]],
      escalaCalificacion: [0, [Validators.required]],
      descripcionTarea: new FormControl(),
    })
  }

  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr', 'div']]
    ]
  };

  guardarTarea(tarea: any) {
    this.tarea.emit({ tarea: this.forma.getRawValue() });
    this.modalRef.hide();
  }
  cancelar(tarea: any) {
    this.modalRef.hide();
  }



}
