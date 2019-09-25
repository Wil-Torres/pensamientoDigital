import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion.component';
import { AdministracionService } from './administracion.service';
import { CuentasComponent } from './cuentas/cuentas.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { GradosSeccionesComponent } from './grados-secciones/grados-secciones.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { CiclosComponent } from './ciclos/ciclos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';

@NgModule({
  declarations: [AdministracionComponent, CuentasComponent, InscripcionComponent, GradosSeccionesComponent, CarrerasComponent, CiclosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AdministracionComponent,
    CuentasComponent
  ],
  providers: [
    AdministracionService
  ]
})
export class AdministracionModule { }
