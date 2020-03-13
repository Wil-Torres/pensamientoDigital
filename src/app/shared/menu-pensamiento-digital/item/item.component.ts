import { Component, OnInit, Input } from '@angular/core';
import { isNil } from 'lodash';
import { Item } from '../../interfaces/menu';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styles: []
})
export class ItemComponent implements OnInit {
  private _id: string;
  private _item: Item;
  private _nivel: number;
  public debug = false;
  constructor() {

  }

  ngOnInit() {
  }

  get id(): string {
    return this._id;
  }

  @Input() set id(value: string) {
    this._id = value;
  }

  get item(): Item {
    return this._item;
  }

  @Input() set item(value: Item) {
    this._item = value;
  }

  get nivel(): number {
    return this._nivel;
  }

  @Input() set nivel(value: number) {
    this._nivel = value;
  }

  get tieneSubMenu(): boolean {
    return !isNil(this._item.subMenu) && (this._item.subMenu.length > 0);
  }
}
