import { Component, OnInit, Input } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { Router } from '@angular/router';
import { Menu } from '../interfaces/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  private _menuCtrl : Menu;
  public get menuCtrl() : Menu {
    return this._menuCtrl;
  }
  @Input()  public set menuCtrl(v : Menu) {
    this._menuCtrl = v;
  }
  

  constructor(public srvSb: SidebarService) { }

  ngOnInit() {
    console.log(this.srvSb)
  }

}
