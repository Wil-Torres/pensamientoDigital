import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaRecursosComponent } from './lista-recursos/lista-recursos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from 'src/app/services/service.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ListaRecursosComponent],
  exports: [ListaRecursosComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceModule,
    SharedModule,
  ]
})
export class RecursosModule { }
