import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaBbienvenidaComponent } from './lista-bbienvenida/lista-bbienvenida.component';

@NgModule({
  declarations: [ListaBbienvenidaComponent],
  exports: [ListaBbienvenidaComponent],
  imports: [
    CommonModule
  ]
})
export class BienvenidaModule { }
