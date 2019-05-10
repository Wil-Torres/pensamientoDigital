import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario/calendario.component';

@NgModule({
  declarations: [CalendarioComponent],
  exports: [CalendarioComponent],
  imports: [
    CommonModule
  ]
})
export class CalendarioModule { }
