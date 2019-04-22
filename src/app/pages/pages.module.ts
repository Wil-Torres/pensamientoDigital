import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { MarcaListaComponent } from './mantenimiento/marca/marca-lista.component';
import { MarcaNuevoComponent } from './mantenimiento/marca/marca-nuevo.component';
import { MarcaEdicionComponent } from './mantenimiento/marca/marca-edicion.component';
import { FormsModule } from "@angular/forms";
import { TiendaComponent } from './configuracion/tienda/tienda.component';
import { CommonModule } from "@angular/common";
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [
        HomeComponent,
        PagesComponent,
        AccountSettingComponent,
        MarcaListaComponent,
        MarcaNuevoComponent,
        MarcaEdicionComponent,
        TiendaComponent,
    ],
    exports: [
        HomeComponent,
        PagesComponent,
        AccountSettingComponent,
        MarcaListaComponent,
        MarcaNuevoComponent,
        MarcaEdicionComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        CommonModule,
        BsDatepickerModule.forRoot()
        
    ]
})

export class PagesModule {}