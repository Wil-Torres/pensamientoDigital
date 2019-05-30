import { Injectable, OnDestroy, OnInit, Inject } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private oldMenu: any;

  constructor(@Inject(DOCUMENT) private _document, private _menu: SidebarService) {
    this.oldMenu = _menu.menu;
  }

  destruir() {
    this._menu.menu = this.oldMenu;
    let panelDerecho: any = document.getElementById('panelDerecho');
    panelDerecho.classList.remove('noVisible');

    let panelCentral: any = document.getElementById('panelCentral');
    panelCentral.classList.remove('col-md-12');
    panelCentral.classList.add('col-md-10');


  }
  inicializar() {

    let selectores: any = document.getElementsByClassName('selector');
    let panelCentral: any = document.getElementById('panelCentral');
    panelCentral.classList.remove('col-md-10');
    panelCentral.classList.add('col-md-12');
    let panelDerecho: any = document.getElementById('panelDerecho');
    panelDerecho.classList.add('noVisible');
    //panelDerecho.parentNode.removeChild(panelDerecho);



    this._menu.menu = [
      {
        titulo: 'Contenido',
        icono: 'fa fa-university',
        url: '/alumno/cursos',
        submenu: []
      },
      {
        titulo: 'Tareas',
        icono: 'fa fa-pencil-square-o',
        url: '/alumno/tareas',
        submenu: []
      },
      {
        titulo: 'Calificaciones',
        icono: 'fa fa-bookmark-o',
        url: '/alumno/calificaciones',
        submenu: []
      },
      {
        titulo: 'Anuncios',
        icono: 'fa fa-newspaper-o',
        url: '/alumno/historial',
        submenu: []
      }
    ]

  }
}
