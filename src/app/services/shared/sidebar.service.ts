import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService{
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
      url: '/clases/lista-clases',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Grupos',
      icono: 'fa fa-users',
      url: '/grupos/lista-grupos',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Panel de Control',
      icono: 'fa fa-tachometer',
      url: '/panel/panel-control',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Noticias',
      icono: 'fa fa-newspaper-o',
      url: '/noticias',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Catalogo',
      icono: 'fa fa-windows',
      url: '/catalogo/lista-catalogo',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Bienvenido/a',
      icono: 'fa fa-spinner',
      url: '/bienvenida',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Usuarios',
      icono: 'fa fa-user',
      url: '/usuarios',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    },{
      titulo: 'Recursos',
      icono: 'fa fa-tasks',
      url: '/recursos',
      submenu: [
        {titulo: 'Configurar Tienda', url: '/configuracion'},
      ]
    }

  ]

  constructor() { }
}
