import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaClasesComponent } from './lista-clases/lista-clases.component';

@NgModule({
  declarations: [ListaClasesComponent],
  exports: [ListaClasesComponent],
  imports: [
    CommonModule
  ]
})
export class ClasesModule { }
