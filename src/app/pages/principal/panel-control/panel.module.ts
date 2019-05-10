import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPanelComponent } from './lista-panel/lista-panel.component';

@NgModule({
  declarations: [ListaPanelComponent],
  exports: [ListaPanelComponent],
  imports: [
    CommonModule
  ]
})
export class PanelModule { }
