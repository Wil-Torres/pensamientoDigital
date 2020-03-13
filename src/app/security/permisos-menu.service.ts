import { Injectable } from '@angular/core';
import { Menu, Modulo } from '../shared/interfaces/menu';
import { isNil, cloneDeep } from 'lodash'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PermisosMenuService {
  private _menuCtrl: Menu;
  private _modulo: Modulo[];



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

  constructor(private afs: AngularFirestore) {
    // implementarServicio

    /**/
  }

  accesosMenu() {
    this.cargarMenu();
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

  async cargarMenu() {
    // establecer servicio que devuelva los accessos
    this._menuCtrl.modulos = cloneDeep(this.modulo);
    console.log(this._menuCtrl)
    const modulos = this._menuCtrl.modulos;
    this.afs.collection('roles_accesos', ref => ref.where('rol', '==', 'teacher')).valueChanges().subscribe((resp: any) => {
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
      console.log(this._menuCtrl)
    })
  }
}
