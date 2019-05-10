import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';

@NgModule({
  declarations: [ListaUsuariosComponent],
  exports: [ListaUsuariosComponent],
  imports: [
    CommonModule
  ]
})
export class UsuariosModule { }
