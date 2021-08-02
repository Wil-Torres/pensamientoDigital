import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReunionComponent } from './reuniones/reunion.component';

@NgModule({
  declarations: [ReunionComponent],
  exports: [ReunionComponent],
  imports: [
    CommonModule
  ]
})
export class SalaModule { }
