import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaRecursosComponent } from './lista-recursos/lista-recursos.component';

@NgModule({
  declarations: [ListaRecursosComponent],
  exports: [ListaRecursosComponent],
  imports: [
    CommonModule
  ]
})
export class RecursosModule { }
