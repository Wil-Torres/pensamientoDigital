import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/service.index';
import { Observable } from 'rxjs';
import { User, UserInfo } from 'src/app/interfaces/Login';
import { Router } from '@angular/router';
import { NotificacionesService } from 'src/app/services/shared/notificaciones.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NotificacionModalComponent } from '../componentes/notificacioens/notificacion-modal.component';
import { Menu } from '../interfaces/menu';
import { PermisosMenuService } from 'src/app/security/permisos-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, AfterViewInit {
  usuarioTemp: User;
  avisos: any;
  modalRef: BsModalRef | null;
  private usuario: UserInfo = JSON.parse(localStorage.getItem('usuarioLogeado'));

  private _menuCtrl: Menu;
  public get menuCtrl(): Menu {
    return this._menuCtrl;
  }
  @Input() public set menuCtrl(v: Menu) {
    this._menuCtrl = v;
  }


  constructor(private modalService: BsModalService, private auth: AuthService,
    private router: Router, private notificacion: NotificacionesService, private _menuSeg: PermisosMenuService) {
    this.auth.user.subscribe(resp => {
      this.usuarioTemp = resp;
      if (this.usuarioTemp != null) {
        this.notificacion.obtenerNotificaiones(this.notificacion.y).subscribe(resp => {
          this.avisos = resp;
        });
      }

    })
    

  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this._menuSeg.menuCtrl = this._menuCtrl;
    this._menuSeg.accesosMenu(this.usuario.uid);
  }

  refrescar() {
    this.menuSeg.accesosMenu(this.usuario.uid);
  }

  cerrarSesion() {
    this.auth.signOut().then(resp => {
      localStorage.removeItem('usuarioLogeado')
      this.router.navigate(['/login']);
    }).catch(err => {
    });
  }

  verNotificacion(id: string, objeto:any) {
    const initialState = { notificacionId: id };
    this.modalRef = this.modalService.show(NotificacionModalComponent, { class: 'modal-lg',ignoreBackdropClick: true, initialState });
  }

  verTodasNotificaciones() {
    this.router.navigate(['/avisos']);
  }

  get menuSeg(): PermisosMenuService {
    return this._menuSeg;
  }

}
