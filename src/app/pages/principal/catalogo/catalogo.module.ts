import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCatalogoComponent } from './lista-catalogo/lista-catalogo.component';

@NgModule({
  declarations: [ListaCatalogoComponent],
  exports: [ListaCatalogoComponent],
  imports: [
    CommonModule
  ]
})
export class CatalogoModule { }
