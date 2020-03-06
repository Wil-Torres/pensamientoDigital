import { Component, OnInit } from '@angular/core';
import { CoreService } from '../services/service.index';
import { Menu } from '../shared/interfaces/menu';
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  bsInlineValue = new Date();
  
  private _srvCore : CoreService;
  
  private _menu : Menu;
  public get menu() : Menu {
    return this._menu;
  }
  public set menu(v : Menu) {
    this._menu = v;
  }
  

  public get srvCore() : CoreService {
    return this._srvCore;
  }
  public set srvCore(v : CoreService) {
    this._srvCore = v;
  }
  
  constructor(private srvCore1: CoreService) { 
    this._srvCore = srvCore1;
  }

  ngOnInit() {
    init_plugins();
    this.initMenu();
  }

  initMenu(){
    this._menu = {
      modulos: [
        {
          id:'', 
          tag:10,
          nombre: 'Clases',
          icono: 'fa fa-book',
          url: '/clases/lista-clases',
          subMenu: [
            {id:'', 
            icono: '',
            subMenu: [],
            tag:101,
            nombre: 'Configurar Tienda', url: '/configuracion'},
          ]
        },
        {
          id:'', 
          tag:20,
          nombre: 'Caminos',
          icono: 'fa fa-arrows',
          url: '',
          subMenu: [
            {id:'', 
            icono: '',
            subMenu: [],
            tag:201,
            nombre: 'Pendiente', url: '/'},
          ]
        }
        
        ,{
          id:'', 
          tag:30,
          nombre: 'Grupos',
          icono: 'fa fa-users',
          url: '/grupos/lista-grupos',
          subMenu: [
            {id:'', 
            icono: '',
            subMenu: [],
            tag:301,
            nombre: 'Configurar Tienda', url: '/configuracion'},
          ]
        },{
          id:'', 
          tag:40,
          nombre: 'Dashboard',
          icono: 'fa fa-tachometer',
          url: '/panel/panel-control',
          subMenu: [
            {id:'', 
            icono: '',
            subMenu: [],
            tag:401,
            nombre: 'Configurar Tienda', url: '/configuracion'},
          ]
        },{
          id:'', 
          tag:50,
          nombre: 'Noticias',
          icono: 'fa fa-newspaper-o',
          url: '/noticias',
          subMenu: [
            {id:'', 
            icono: '',
            subMenu: [],
            tag:501,
            nombre: 'Configurar Tienda', url: '/configuracion'},
          ]
        },{
          id:'', 
          tag:60,
          nombre: 'Catalogo',
          icono: 'fa fa-windows',
          url: '/catalogo/lista-catalogo',
          subMenu: [
            {id:'', 
            icono: '',
            subMenu: [],
            tag:601,
            nombre: 'Configurar Tienda', url: '/configuracion'},
          ]
        },{
          id:'', 
          tag:70,
          nombre: 'Bienvenido/a',
          icono: 'fa fa-spinner',
          url: '/bienvenida',
          subMenu: [
            {id:'', 
            icono: '',
            subMenu: [],
            tag:701,
            nombre: 'Bienvenida', url: '/bienvenida'},
          ]
        },{
          id:'', 
          tag:80,
          nombre: 'Usuarios',
          icono: 'fa fa-user',
          url: '/panel-usuarios',
          subMenu: [
            {id:'', 
            icono: '',
            subMenu: [],
            tag:801,
            nombre: 'Panel Usuarios', url: '/panel-usuarios'},
          ]
        },{
          id:'', 
          tag:90,
          nombre: 'Recursos',
          icono: 'fa fa-tasks',
          url: '/recursos',
          subMenu: [
            {id:'', 
            icono: '',
            subMenu: [],
            tag:901,
            nombre: 'Panel de Recursos', url: '/configuracion'},
          ]
        },{
          id:'', 
          tag:100,
          nombre: 'Reportes',
          icono: 'fa fa-line-chart',
          url: '/reportes',
          subMenu: [
            {id:'', 
            icono: '',
            subMenu: [],
            tag:1001,
            nombre: 'Reportes', url: '/reportes'},
          ]
        },{
          id:'', 
          tag:101,
          nombre: 'Administracion',
          icono: 'fa fa-cog',
          url: '/administracion',
          subMenu: [
            {id:'', 
            icono: '',
            subMenu: [],
            tag:1011,
            nombre: 'Administracion', url: '/administracion'},
          ]
        }
    
      ],
      mostrar: true,
      alternar() {
        this.mostrar = !this.mostrar;
      },
      abrir() {
        this.mostrar = true;
      },
      cerrar() {
        this.mostrar = false;
      }
    };
  }

}
