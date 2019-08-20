import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/service.index';
import { User } from 'src/app/interfaces/login';
import { NotificacionesService } from 'src/app/services/shared/notificaciones.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  perfil: any = {};
  notificaciones: any = [];

  constructor(private srvAuth: AuthService, private srvNtf: NotificacionesService) {
    this.srvAuth.user.subscribe((usuario: any) => {
      this.perfil = usuario;
      this.srvNtf.obtenerNotificaiones(usuario.uid).subscribe(notificaciones => {
        this.notificaciones = notificaciones;
      })
    });
  }


  ngOnInit() {

  }

}
