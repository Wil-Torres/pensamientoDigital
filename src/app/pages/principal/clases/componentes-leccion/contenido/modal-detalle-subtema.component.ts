import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { RecursosService } from '../../../recursos/recursos.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import swal from 'sweetalert';
import { isNil } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-detalle-subtema',
  templateUrl: './modal-detalle-subtema.component.html',
  styles: [
    `.tamañoModal { width: 1000px; }`
  ]
})
export class ModalDetalleSubtemaComponent implements OnInit {
  subContenido: any = {};
  tipoCargado: number = 1;
  tDocto: FileList;
  private _cursoId: string;
  private _leccionId: string;
  get leccionId(): string {
    return this._leccionId;
  }
  get cursoId(): string {
    return this._cursoId;
  }
  @Input('leccionId') set leccionId(v: string) {
    this._leccionId = v;
  }
  @Input('cursoId') set cursoId(v: string) {
    this._cursoId = v;
  }


  private _addContenido: EventEmitter<any>;

  public get addContenido(): EventEmitter<any> {
    return this._addContenido;
  }
  public set addContenido(v: EventEmitter<any>) {
    this._addContenido = v;
  }

  constructor(private srvRecurso: RecursosService, public modalRef: BsModalRef, private router: ActivatedRoute) {
    this.addContenido = new EventEmitter<any>();
  }

  cancelar() {
    this.modalRef.hide();
  }


  ngOnInit() {
  }

  cargarInfo(archivo: FileList) {
    this.tDocto = archivo;
  }

  validar() {
    let respuesta = { error: false, mensaje: '' }
    if (!this.subContenido.tipo) {
      return { error: true, mensaje: 'Falta seleccionar tipo de contenido' }
    }
    switch (this.tipoCargado) {
      case 2:
        if (isNil(this.subContenido.url)) {
          return { error: true, mensaje: 'Falta ingresar url de contenido en linea' }
        }
        break;
      case 1:
        if (!this.tDocto) {
          return { error: true, mensaje: 'Falta cargar contenido' }
        }
        break;
    }
    return respuesta;
  }

  agregarSubContendio() {

    let valida = this.validar();
    if (valida.error) {
      swal('Información incompleta', valida.mensaje, 'error')
      return;
    }

    if (this.tipoCargado === 1) {
      this.srvRecurso.addRecursoCurso(this._cursoId, this._leccionId, 0, this.tDocto).then((resp: any) => {
        this.addContenido.emit({
          url: resp.url,
          path: resp.fullPath,
          tipo: this.subContenido.tipo,
          visto: false
        });
        this.modalRef.hide();
      }).catch(err => {
        this.modalRef.hide();
      })
    } else {
      this.addContenido.emit({
        url: this.subContenido.url,
        tipo: this.subContenido.tipo,
        visto: false
      });
      this.modalRef.hide();
    }
  }

}
