import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu : any = [
    /*{
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Marca', url: '/lista-marcas'},
        {titulo: 'Categoria', url: ''},
        {titulo: 'Medida', url: ''},
        {titulo: 'Producto', url: ''},
        {titulo: 'Otras Opciones', url: ''}
      ]
    },
    {
      titulo: 'Movimiento',
      icono: 'mdi mdi-tag',
      submenu: [
        {titulo: 'Entradas', url: '/home'},
        {titulo: 'Salidas', url: ''},
        {titulo: 'Kardex', url: ''}
      ]
    },
    {
      titulo: 'Configuracion',
      icono: 'mdi mdi-settings',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },*/
    /* MENU PENSAMIENTO DIGITAL */
    {
      titulo: 'Clases',
      icono: 'fa fa-book',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Grupos',
      icono: 'fa fa-users',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Panel de Control',
      icono: 'fa fa-tachometer',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Noticias',
      icono: 'fa fa-newspaper-o',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Catalogo',
      icono: 'fa fa-windows',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Bienvenido/a',
      icono: 'fa fa-spinner',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Usuarios',
      icono: 'fa fa-user',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Recursos',
      icono: 'fa fa-tasks',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    }

  ]

  constructor() { }
}
