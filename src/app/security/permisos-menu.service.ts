import { Injectable } from '@angular/core';
import { Menu, Modulo } from '../shared/interfaces/menu';
import { isNil, cloneDeep } from 'lodash'
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/service.index';
import { UserInfo } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class PermisosMenuService {
  private _menuCtrl: Menu;
  private _modulo: Modulo[];
  private usuario: UserInfo = JSON.parse(localStorage.getItem('usuarioLogeado'));



  public get modulo(): Modulo[] {
    return this._modulo;
  }
  public set modulo(v: Modulo[]) {
    this._modulo = v;
  }

  public get menuCtrl(): Menu {
    return this._menuCtrl;
  }
  public set menuCtrl(v: Menu) {
    if (!isNil(v)) {
      this.modulo = cloneDeep(v.modulos);
    }
    this._menuCtrl = v;
  }
  tempPermisos: any;

  constructor(private afs: AngularFirestore, private usr: AuthService,) {
    // implementarServicio
    /**/
  }

  accesosMenu(usuarioId: string) {
    this.afs.collection('users').doc(usuarioId).valueChanges().subscribe((resp: any) => {
      this.cargarMenu(resp.roles);
    })
  }

  revisarAcceso(menu: any, accesos: any[]) {
    if ((menu.subMenu || []).length === 0) {
      if (menu.tag === 0 || accesos.reduce((existe, acceso) => {
        return existe || (acceso.operacionId === menu.tag);
      }, false)) {
        return true;
      }
      return false;
    }
    const menuBorrado = [];
    menu.subMenu.forEach(subMenu => {
      if (!this.revisarAcceso(subMenu, accesos)) {
        menuBorrado.push(subMenu);
      }
    });
    menuBorrado.forEach(subMenu => {
      menu.subMenu.splice(menu.subMenu.indexOf(subMenu), 1);
    });
    return menu.subMenu.length !== 0;

  }

  async cargarMenu(listaRoles: any) {
    // establecer servicio que devuelva los accessos
    this._menuCtrl.modulos = cloneDeep(this.modulo);
    const modulos = this._menuCtrl.modulos;

    Object.keys(listaRoles).forEach((elem, index, listaRoles2) => {
      if (listaRoles[elem]) {
        this.afs.collection('roles_accesos', ref => ref.where('rol', '==', elem)).valueChanges().subscribe((resp: any) => {
          const accesoPermitido = resp;
          const MenuReservado = [];

          modulos.forEach(elem => {
            if (!this.revisarAcceso(elem, accesoPermitido)) {
              MenuReservado.push(elem);
            }
          });

          MenuReservado.forEach(elem => {
            modulos.splice(modulos.indexOf(elem), 1);
          });
          
        })

      }
    })
  }
}
