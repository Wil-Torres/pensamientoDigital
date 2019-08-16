import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { PanelComponent } from './panel/panel.component';
import { ModalNuevoEdicionComponent } from './modal-nuevo-edicion/modal-nuevo-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListaUsuariosComponent, PanelComponent, ModalNuevoEdicionComponent],
  exports: [ListaUsuariosComponent, ModalNuevoEdicionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
    
  ],
  entryComponents:[ModalNuevoEdicionComponent]
})
export class UsuariosModule { }
