import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPanelComponent } from './lista-panel/lista-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceModule } from 'src/app/services/service.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from 'src/app/shared/componentes/grafico-dona/grafico-dona.component';
import { GraficoLineaComponent } from 'src/app/shared/componentes/grafico-linea/grafico-linea.component';

@NgModule({
  declarations: [ListaPanelComponent, GraficoDonaComponent, GraficoLineaComponent],
  exports: [ListaPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceModule,
    SharedModule,
    ChartsModule
  ]
})
export class PanelModule { }
