import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/service.index';
import { NotificacionesService } from 'src/app/services/shared/notificaciones.service';

@Component({
  selector: 'app-notificacion-lista',
  templateUrl: './notificacion-lista.component.html',
  styles: []
})
export class NotificacionListaComponent implements OnInit {
  private usuario;
  private _objetos: any[] = [];
  numeroRegistros: number;
  public get objetos(): any[] {
    return this._objetos;
  }
  public set objetos(v: any[]) {
    this._objetos = v;
  }


  constructor(private srvNtf: NotificacionesService, private srvAuth: AuthService) {
    this.srvAuth.user.subscribe(usuario => {
      this.usuario = {
        displayName: usuario.displayName,
        email: usuario.email,
        photoURL: usuario.photoURL,
        uid: usuario.uid,
      }

    })
  }

  ngOnInit() {
    this.buscar();
  }

  buscar(offset: number = 0, limit: number = 10) {
    this.srvNtf.obtenerNotificaiones(this.srvNtf.y).subscribe(notificacion => {
      this.objetos = notificacion;
    });
  }

}
