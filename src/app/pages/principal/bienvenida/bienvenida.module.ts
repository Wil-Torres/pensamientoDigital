import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaBienvenidaComponent } from './lista-bienvenida/lista-bienvenida.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSummernoteModule } from 'ngx-summernote';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceModule } from 'src/app/services/service.module';
import { NosotrosComponent } from './nosotros/nosotros.component';

@NgModule({
  declarations: [ListaBienvenidaComponent, NosotrosComponent],
  exports: [ListaBienvenidaComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSummernoteModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceModule,
    SharedModule,
  ]
})
export class BienvenidaModule { }
