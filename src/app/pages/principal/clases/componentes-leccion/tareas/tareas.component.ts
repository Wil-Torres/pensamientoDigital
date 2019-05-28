import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap';
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

  form: FormGroup;
  prueba: any = '<p>Hola que tal</p><p>qw</p><p>qwe</p>'
  constructor(private sanitizer: DomSanitizer, public modalRef: BsModalRef, private builder: FormBuilder) {
    this.tarea = new EventEmitter<any>();
    this.objInit()
    /*this.form = new FormGroup({
      html: new FormControl('<p>Hola que tal</p><p>qw</p><p>qwe</p>')
    });*/
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
      tareaTitulo: [null, [Validators.required]],
      puntajeMaximo: [null, [Validators.required]],
      intervaloMaximo: [null, [Validators.required]],
      tareaCategoria: [null, [Validators.required]],
      calificacionTarea: [null, [Validators.required]],
      fechaInicioTarea: [null, [Validators.required]],
      fechaFinTarea: [null, [Validators.required]],
      leccion: [null, [Validators.required]],
      escalaCalificacion: [null, [Validators.required]],
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

  editorDisabled = false;

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get('html').value);
  }

  enableEditor() {
    this.editorDisabled = false;
  }

  disableEditor() {
    this.editorDisabled = true;
  }
  onBlur() {
    console.log('Blur');
  }
  guardarTarea(tarea: any) {
    this.tarea.emit({ tarea: this.forma.getRawValue() });
    this.modalRef.hide();
  }
  cancelar(tarea: any) {
    this.modalRef.hide();
  }



}
