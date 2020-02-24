import { Component, OnInit, EventEmitter } from '@angular/core';
import { RecursosService } from '../../../recursos/recursos.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import swal from 'sweetalert';
import { isNil} from 'lodash';

@Component({
  selector: 'app-modal-detalle-subtema',
  templateUrl: './modal-detalle-subtema.component.html',
  styles: []
})
export class ModalDetalleSubtemaComponent implements OnInit {
  subContenido: any = {};
  tipoCargado: number = 1;
  tDocto: FileList;

  private _addContenido: EventEmitter<any>;

  public get addContenido(): EventEmitter<any> {
    return this._addContenido;
  }
  public set addContenido(v: EventEmitter<any>) {
    this._addContenido = v;
  }
  modalRef: BsModalRef;
  constructor(private srvRecurso: RecursosService) {
    this.addContenido = new EventEmitter<any>();
  }

  cancelar(){}


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
      this.srvRecurso.addRecursoCurso('JNRSpYOiJEOGjFGrQJdy', 'PDatBCfKSLQ3hAmQimgp', 0, this.tDocto).then(resp => {
        this.addContenido.emit({
          url: resp,
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
