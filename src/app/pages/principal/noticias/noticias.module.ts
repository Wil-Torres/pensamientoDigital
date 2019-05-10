import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaNoticiasComponent } from './lista-noticias/lista-noticias.component';

@NgModule({
  declarations: [ListaNoticiasComponent],
  exports: [ListaNoticiasComponent],
  imports: [
    CommonModule
  ]
})
export class NoticiasModule { }
