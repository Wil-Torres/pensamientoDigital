import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion.component';
import { AdministracionService } from './administracion.service';
import { CuentasComponent } from './cuentas/cuentas.component';

@NgModule({
  declarations: [AdministracionComponent, CuentasComponent],
  imports: [
    CommonModule
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
