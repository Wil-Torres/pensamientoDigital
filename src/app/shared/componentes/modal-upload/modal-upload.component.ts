import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { ServicioModalService } from './servicio-modal.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;
  objeto: any = {};
  oculto: string;

  constructor(public srvModal: ServicioModalService) { }

  ngOnInit() {
    this.objeto = this.srvModal.objeto;
  }

  subirImagen () {
  }
  cerrarModal () {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this.srvModal.ocultarModal();
  }
  actualizarGaleria () {
    
  } 

}
