import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCatalogoComponent } from './lista-catalogo/lista-catalogo.component';
import { ListaDetalleCatalogoComponent } from './lista-detalle-catalogo/lista-detalle-catalogo.component';
import { ListaCatalogoCursosComponent } from './lista-catalogo-cursos/lista-catalogo-cursos.component';

@NgModule({
  declarations: [ListaCatalogoComponent, ListaDetalleCatalogoComponent, ListaCatalogoCursosComponent],
  exports: [ListaCatalogoComponent, ListaDetalleCatalogoComponent],
  imports: [
    CommonModule
  ]
})
export class CatalogoModule { }
