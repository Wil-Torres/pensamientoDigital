import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaGruposComponent } from './lista-grupos/lista-grupos.component';

@NgModule({
  declarations: [ListaGruposComponent],
  exports: [ListaGruposComponent],
  imports: [
    CommonModule
  ]
})
export class GruposModule { }
