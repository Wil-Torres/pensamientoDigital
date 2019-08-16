import { Component, OnInit } from '@angular/core';
import { ModalNuevoEdicionComponent } from '../modal-nuevo-edicion/modal-nuevo-edicion.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styles: []
})
export class PanelComponent implements OnInit {
  modalRef: BsModalRef | null;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  agregarUsuario(tipo:number, edicion:boolean = false) {
    const opciones = {
      initialState: {
        tipoUsuario: tipo,
        edicion: edicion
      },
      class: 'modal-lg'
    };
    this.modalRef = this.modalService.show(ModalNuevoEdicionComponent, opciones);
  }


}
