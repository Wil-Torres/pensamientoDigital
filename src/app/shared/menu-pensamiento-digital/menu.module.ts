import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPensamientoDigitalComponent } from './menu-pensamiento-digital.component';
import { HeadersComponent } from './header/headers.component';
import { SidebarsComponent } from './sidebar/sidebars.component';
import { ItemComponent } from './item/item.component';
import { ItemsComponent } from './items/items.component';
import { ModuloComponent } from './modulo/modulo.component';

@NgModule({
  declarations: [
    MenuPensamientoDigitalComponent,
    HeadersComponent,
    SidebarsComponent,
    ItemComponent,
    ItemsComponent,
    ModuloComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuPensamientoDigitalComponent,
    HeadersComponent,
    SidebarsComponent,
    ItemComponent,
    ItemsComponent,
    ModuloComponent,
  ]
})
export class MenuModule { }
