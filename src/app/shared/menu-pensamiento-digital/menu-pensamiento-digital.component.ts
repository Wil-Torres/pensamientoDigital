import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../interfaces/menu';

@Component({
  selector: 'app-menu-pensamiento-digital',
  templateUrl: './menu-pensamiento-digital.component.html',
  styleUrls: ['./menu-pensamiento-digital.component.css']
})
export class MenuPensamientoDigitalComponent implements OnInit {

  private _menuCtrl : Menu;

  constructor() { }

  ngOnInit() {
  }

  public get menuCtrl() : Menu {
    return this._menuCtrl;
  }
  @Input()  public set menuCtrl(v : Menu) {
    this._menuCtrl = v;
  }

}
