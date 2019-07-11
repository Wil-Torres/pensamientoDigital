import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { ClasesService } from '../../clases.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert'
import { isNil } from 'lodash'

@Component({
  selector: 'app-modal-nueva-leccion',
  templateUrl: './modal-nueva-leccion.component.html',
  styleUrls: ['./modal-nueva-leccion.component.css']
})
export class ModalNuevaLeccionComponent implements OnInit {

  private _forma: FormGroup;
  private _leccion: EventEmitter<any>;
  private _objetoId: string;
  private _curso: any = {};

  public get curso(): any {
    return this._curso;
  }
  public set curso(v: any) {
    this._curso = v;
  }
  public get objetoId(): string {
    return this._objetoId;
  }
  public set objetoId(v: string) {
    this._objetoId = v;
  }
  public get leccion(): EventEmitter<any> {
    return this._leccion;
  }
  public set leccion(v: EventEmitter<any>) {
    this._leccion = v;
  }
  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }

  constructor(public modalRef: BsModalRef, private builder: FormBuilder, private srvClase: ClasesService,
    private router: Router, private aRoute: ActivatedRoute) {
    this.leccion = new EventEmitter<any>();
    this.objInit()
  }

  ngOnInit() {
    if (this.objetoId) {
      this.obtenerCurso();
    }
  }
  objInit() {
    this._forma = this.builder.group({
      id: null,
      imagen: 'https://firebasestorage.googleapis.com/v0/b/prueba-1df69.appspot.com/o/default%2Fdefault-course.png?alt=media&token=de67dcdd-b0a8-4768-b9a1-8d103ba73bf2',
      titulo: [null, [Validators.required]],
      fechaInicio: [null, [Validators.required]],
      fechaFin: [null, [Validators.required]],
      descripcion: null,
      avance: null,
      estado: null,
      categoria: null,
      idioma: null,
      creditos: null,
      secciones: [[]],
      contenido: [[]],
      test: [[]], // contestar test en linea
      discuciones: [[]], // discute un tema y gana puntos por contestar
      equipo: [[]], // agrupar alumnos en equipos y calificar esfuerzo en conjunto
      biblioteca: [[]], // añadir trabajdo existentes
      encuesta: [[]], // realiza una encuesta en linea
      archivos: [[]],
    })
  }
  guardar() {
    let valida = this.validaciones();
    if (valida.error) {
      swal("Ocurrio un problema", valida.mensaje, "error")
      return
    }
    // this.curso.detalle_Lecciones.push(this.forma.getRawValue());
    this.srvClase.addLeccion(this.curso.id, this.forma.getRawValue()).then(leccion => {
      leccion.update({ id: leccion.id, $key: leccion.id }).then(() => {
        this.leccion.emit({ leccion: this.forma.getRawValue(), actualizado: true });
        this.modalRef.hide();
      }).catch(err => {
        swal('Ocurrio un problema', 'Fallo al guardar la leccion', 'error').then(() => {
          this.modalRef.hide();
        });
      })
    })
  }
  cancelar() {
    this.modalRef.hide();
  }

  validaciones() {
    let resultado = { error: false, mensaje: '' };
    if (isNil(this.forma.value.titulo)) {
      resultado = { error: true, mensaje: 'Falta ingresar titulo de leccion' }
      return resultado;
    }
    if (isNil(this.forma.value.fechaInicio)) {
      resultado = { error: true, mensaje: 'Falta ingresar fecha de inicio' }
      return resultado;
    }
    if (isNil(this.forma.value.fechaFin)) {
      resultado = { error: true, mensaje: 'Falta ingresar fecha de finalización' }
      return resultado;
    }
    return resultado;
  }

  obtenerCurso() {
    this.srvClase.getCurso(this.objetoId).subscribe(curso => {
      this.curso = curso;
    })
  }




}
