import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/service.index';
import { User } from 'src/app/interfaces/Login';
import { Router } from '@angular/router';
import { NotificacionesService } from 'src/app/services/shared/notificaciones.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PermisosMenuService } from 'src/app/security/permisos-menu.service';
import { Menu } from '../../interfaces/menu';
import { NotificacionModalComponent } from '../../componentes/notificacioens/notificacion-modal.component';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styles: []
})
export class HeadersComponent implements OnInit, AfterViewInit {
  usuarioTemp: User;
  avisos: any;
  modalRef: BsModalRef | null;
  
  private _menuCtrl : Menu;
  public get menuCtrl() : Menu {
    return this._menuCtrl;
  }
  @Input()  public set menuCtrl(v : Menu) {
    this._menuCtrl = v;
  }
  
  
  constructor(private modalService: BsModalService, private auth: AuthService, 
    private router: Router, private notificacion: NotificacionesService, private _menuSeg: PermisosMenuService) {
    this.auth.user.subscribe(resp => { 
      this.usuarioTemp = resp;
      this.notificacion.obtenerNotificaiones(this.usuarioTemp.uid).subscribe(resp => {
        this.avisos = resp; 
      });

    })
    
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this._menuSeg.menuCtrl = this._menuCtrl;
    this._menuSeg.accesosMenu();
  }

  refrescar() {
    this.menuSeg.accesosMenu();
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

  get menuSeg(): PermisosMenuService {
    return this._menuSeg;
  }

}
