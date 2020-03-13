import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../interfaces/menu';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styles: []
})
export class SidebarsComponent implements OnInit {

  private _menuCtrl: Menu;
  constructor() { }

  ngOnInit() {
  }

  get menuCtrl(): Menu {
    return this._menuCtrl;
  }

  @Input() set menuCtrl(value: Menu) {
    this._menuCtrl = value;
  }

}
