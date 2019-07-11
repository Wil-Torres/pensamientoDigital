import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/services/service.index';
import { NotificacionesService } from 'src/app/services/shared/notificaciones.service';

@Component({
  selector: 'app-notificacion-modal',
  templateUrl: './notificacion-modal.component.html',
  styles: []
})
export class NotificacionModalComponent implements OnInit {
  
  usuario: any = {};
  notificacion: any = {};
  notificacionId: string;

  constructor(public modalRef: BsModalRef, private usr: AuthService,
    private srvNtf: NotificacionesService) {
    this.usr.user.subscribe(resp => {
      this.usuario.displayName = resp.displayName;
      this.usuario.email = resp.email;
      this.usuario.photoURL = resp.photoURL;
      this.usuario.uid = resp.uid;
      this.objInit();
    })
    console.log('ha iniciado')
  }

  ngOnInit() { 
    
  }

  objInit() {
    this.srvNtf.obtenerNotificaion(this.usuario.uid, this.notificacionId).subscribe((aviso:any)=>{
      if(!aviso.read){
        this.srvNtf.marcarLeido(this.usuario.uid, aviso.id).then(() => {});
      }
      this.notificacion = aviso;
    })
  }

  cancelar(discucion: any) {
    this.modalRef.hide();
  }
}
