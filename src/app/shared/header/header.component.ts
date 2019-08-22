import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/service.index';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/Login';
import { Router } from '@angular/router';
import { NotificacionesService } from 'src/app/services/shared/notificaciones.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NotificacionModalComponent } from '../componentes/notificacioens/notificacion-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuarioTemp: User;
  avisos: any;
  modalRef: BsModalRef | null;
  
  constructor(private modalService: BsModalService, private auth: AuthService, 
    private router: Router, private notificacion: NotificacionesService) {
    this.auth.user.subscribe(resp => { 
      this.usuarioTemp = resp;
      this.notificacion.obtenerNotificaiones(this.usuarioTemp.uid).subscribe(resp => {
        this.avisos = resp; 
      });
    })
    
  }

  ngOnInit() {

  }

  cerrarSesion() {
    this.auth.signOut().then(resp => {
      this.router.navigate(['/login']);
    }).catch(err => {
      console.log(err);
    });
  }

  verNotificacion(id:string) {
    const initialState = { notificacionId: id};
    this.modalRef = this.modalService.show(NotificacionModalComponent, { class: 'modal-lg', initialState });
  }

  verTodasNotificaciones () {
    this.router.navigate(['/avisos']);
  }

}
