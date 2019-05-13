import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaClasesComponent } from './lista-clases/lista-clases.component';
import { ClaseComponent } from './clase/clase.component';
import { FormsModule } from '@angular/forms';
import { LeccionNuevoEdicionComponent } from './leccion-nuevo-edicion/leccion-nuevo-edicion.component';
import { ContenidoComponent } from './componentes-leccion/contenido/contenido.component';
import { SeccionesComponent } from './componentes-leccion/secciones/secciones.component';
import { TestComponent } from './componentes-leccion/test/test.component';
import { DiscucionesComponent } from './componentes-leccion/discuciones/discuciones.component';
import { EquiposComponent } from './componentes-leccion/equipos/equipos.component';
import { BibliotecaComponent } from './componentes-leccion/biblioteca/biblioteca.component';
import { EncuestaComponent } from './componentes-leccion/encuesta/encuesta.component';
import { ArchivosComponent } from './componentes-leccion/archivos/archivos.component';

@NgModule({
  declarations: [ListaClasesComponent, ClaseComponent, LeccionNuevoEdicionComponent, ContenidoComponent, SeccionesComponent, TestComponent, DiscucionesComponent, EquiposComponent, BibliotecaComponent, EncuestaComponent, ArchivosComponent],
  exports: [ListaClasesComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ClasesModule { }
