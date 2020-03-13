import { Component, OnInit, Input } from '@angular/core';
import { Modulo, Menu } from '../../interfaces/menu';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styles: []
})
export class ModuloComponent implements OnInit {
  private _modulo: Modulo;
  private _menuCtrl: Menu;
  constructor() { }

  ngOnInit() {
  }

  get modulo(): Modulo {
    return this._modulo;
  }

  @Input() set modulo(value: Modulo) {
    this._modulo = value;
  }

  get menuCtrl(): Menu {
    return this._menuCtrl;
  }

  @Input() set menuCtrl(value: Menu) {
    this._menuCtrl = value;
  }
}
