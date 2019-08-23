import { Component, OnInit, EventEmitter } from '@angular/core';
import { RecursosService } from '../../../recursos/recursos.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

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

  constructor(private srvRecurso: RecursosService, private modalRef: BsModalRef) { 
    this.addContenido = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  cargarInfo(archivo: FileList){
    this.tDocto = archivo;
  }

  agregarSubContendio (item:number) {

    if(this.tipoCargado === 1) {
      this.srvRecurso.addRecursoCurso('JNRSpYOiJEOGjFGrQJdy','PDatBCfKSLQ3hAmQimgp',0,this.tDocto).then(resp => {
        this.addContenido.emit({ url: resp, 
          tipo: this.subContenido.tipo, 
          visto: false });
        this.modalRef.hide();
      }).catch(err => {
        this.modalRef.hide();
      })
    } else {
      this.addContenido.emit({ url: this.subContenido.url, 
        tipo: this.subContenido.tipo, 
        visto: false });
      this.modalRef.hide();
    }
  }

}
