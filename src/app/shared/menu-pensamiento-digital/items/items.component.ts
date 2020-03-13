import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../interfaces/menu';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styles: []
})
export class ItemsComponent implements OnInit {
  private _id: string;
  private _items: Item[];
  private _nivel: number;
  constructor() { }

  ngOnInit() {
  }

  get id(): string {
    return this._id;
  }

  @Input() set id(value: string) {
    this._id = value;
  }

  get items(): Item[] {
    return this._items;
  }

  @Input() set items(value: Item[]) {
    this._items = value;
  }

  get nivel(): number {
    return this._nivel;
  }

  @Input() set nivel(value: number) {
    this._nivel = value;
  }
}
