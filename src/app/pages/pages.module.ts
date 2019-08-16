import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TiendaComponent } from './configuracion/tienda/tienda.component';
import { CommonModule } from "@angular/common";
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ClasesModule } from "./principal/clases/clases.module";
import { BienvenidaModule } from "./principal/bienvenida/bienvenida.module";
import { CatalogoModule } from "./principal/catalogo/catalogo.module";
import { GruposModule } from "./principal/grupos/grupos.module";
import { NoticiasModule } from "./principal/noticias/noticias.module";
import { PanelModule } from "./principal/panel-control/panel.module";
import { RecursosModule } from "./principal/recursos/recursos.module";
import { UsuariosModule } from "./principal/usuarios/usuarios.module";
import { CalendarioModule } from "./principal/calendario/calendario.module";
import { AlumnosComponent } from './mantenimiento/alumnos/alumnos.component';
import { EncargadoAlumnoComponent } from './mantenimiento/encargado-alumno/encargado-alumno.component';
import { ProfesoresComponent } from './mantenimiento/profesores/profesores.component';
import { GradosComponent } from './mantenimiento/grados/grados.component';
import { CarrerasComponent } from './mantenimiento/carreras/carreras.component';
import { SeccionesComponent } from './mantenimiento/secciones/secciones.component';
import { CiclosComponent } from './mantenimiento/ciclos/ciclos.component';
import { AdministracionModule } from "./principal/administracion/administracion.module";
import { ReportesModule } from "./principal/reportes/reportes.module";

@NgModule({
    declarations: [
        HomeComponent,
        PagesComponent,
        AccountSettingComponent,
        TiendaComponent,
        AlumnosComponent,
        EncargadoAlumnoComponent,
        ProfesoresComponent,
        GradosComponent,
        CarrerasComponent,
        SeccionesComponent,
        CiclosComponent
    ],
    exports: [
        HomeComponent,
        PagesComponent,
        AccountSettingComponent,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        ClasesModule,
        BienvenidaModule,
        CalendarioModule,
        CatalogoModule,
        GruposModule,
        NoticiasModule,
        PanelModule,
        RecursosModule,
        UsuariosModule,
        AdministracionModule,
        ReportesModule,      
        PAGES_ROUTES,
        FormsModule,
        CommonModule,
        BsDatepickerModule.forRoot(),
        
    ]
})

export class PagesModule {}