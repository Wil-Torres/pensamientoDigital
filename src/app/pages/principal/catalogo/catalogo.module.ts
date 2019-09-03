import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCatalogoComponent } from './lista-catalogo/lista-catalogo.component';
import { ListaDetalleCatalogoComponent } from './lista-detalle-catalogo/lista-detalle-catalogo.component';

@NgModule({
  declarations: [ListaCatalogoComponent, ListaDetalleCatalogoComponent],
  exports: [ListaCatalogoComponent, ListaDetalleCatalogoComponent],
  imports: [
    CommonModule
  ]
})
export class CatalogoModule { }
