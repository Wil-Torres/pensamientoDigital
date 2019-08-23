import { Component, OnInit, Input } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { FormGroup } from '@angular/forms';
import { RecursosService } from '../../../recursos/recursos.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalDetalleSubtemaComponent } from './modal-detalle-subtema.component';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styles: []
})
export class ContenidoComponent implements OnInit {
  detalle :any = {};
  temContenido: [];
  lineaSeleccionada: number;
  modalRef: BsModalRef | null;

  private _forma : FormGroup;
  public get forma() : FormGroup {
    return this._forma;
  }
  @Input() public set forma(v : FormGroup) {
    this._forma = v;
  }
   constructor(private srvRecurso: RecursosService, private modalService: BsModalService ) { }

  ngOnInit() {}

  objInit () {}
  cancelar () {
    this.detalle = {};
  }
  agregarDetalle() {
    this.detalle.detalle = [];
    this.forma.value.contenido.push(this.detalle)
    this.cancelar();
  }

  seleccionar(item:number){
    this.lineaSeleccionada = item;
  }

  mostrarContenido(item: any) {
    this.temContenido = item.detalle;
  }

  addDetalleContenido(id:number) {
    this.modalRef = this.modalService.show(ModalDetalleSubtemaComponent, { class: 'modal-lg' });
    let contenidoTemp = this.modalRef.content.addContenido.subscribe((content: any) => {
      this.forma.value.contenido[id].detalle.push(content)
      contenidoTemp.unsubscribe();
    })
  }


}
