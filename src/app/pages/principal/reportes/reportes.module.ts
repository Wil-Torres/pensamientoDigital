import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes/reportes.component';
import { ReportesService } from './reportes.service';

@NgModule({
  declarations: [ReportesComponent],
  imports: [
    CommonModule
  ],
  exports: [ReportesComponent],
  providers: [ReportesService]
})
export class ReportesModule { }
