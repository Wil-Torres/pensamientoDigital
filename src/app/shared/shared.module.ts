import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EncabezadoPaginaComponent } from './componentes/encabezado-pagina/encabezado-pagina.component';
import { PaginacionComponent } from './componentes/paginacion/paginacion.component';
import { BusquedaListaComponent } from './componentes/busqueda-lista/busqueda-lista.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginationModule } from "ngx-bootstrap";
import { FileUploadComponent } from './componentes/file-upload/file-upload.component';
import { ModalUploadComponent } from './componentes/modal-upload/modal-upload.component';
import { UploadDirective } from "../directivas/upload.directive";
import { RequeridoDirective } from "../directivas/requerido.directive";
import { NotificacionModalComponent } from './componentes/notificacioens/notificacion-modal.component';
import { NotificacionListaComponent } from './componentes/notificacioens/notificacion-lista.component';
import { GtInicioSpinnerComponent } from './componentes/gt-inicio-spinner/gt-inicio-spinner.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BusquedaModalComponent } from './componentes/busqueda-modal/busqueda-modal.component';
import { QuizzesComponent } from './componentes/quizzes/quizzes.component';
import { MenuPensamientoDigitalComponent } from './menu-pensamiento-digital/menu-pensamiento-digital.component';
import { ItemComponent } from './menu-pensamiento-digital/item/item.component';
import { ItemsComponent } from './menu-pensamiento-digital/items/items.component';
import { ModuloComponent } from './menu-pensamiento-digital/modulo/modulo.component';
import { MenuModule } from "./menu-pensamiento-digital/menu.module";

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        EncabezadoPaginaComponent,
        PaginacionComponent,
        BusquedaListaComponent,
        FileUploadComponent,
        ModalUploadComponent,
        UploadDirective,
        RequeridoDirective,
        NotificacionModalComponent,
        NotificacionListaComponent,
        GtInicioSpinnerComponent,
        BusquedaModalComponent,
        QuizzesComponent,
        MenuPensamientoDigitalComponent,
    ],
    exports: [
        SidebarComponent,
        HeaderComponent,
        MenuPensamientoDigitalComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        EncabezadoPaginaComponent,
        PaginacionComponent,
        BusquedaListaComponent,
        FileUploadComponent,
        ModalUploadComponent,
        UploadDirective,
        RequeridoDirective,
        NotificacionModalComponent,
        NotificacionListaComponent,
        GtInicioSpinnerComponent,
        BusquedaModalComponent,
        QuizzesComponent,
        MenuPensamientoDigitalComponent
    ],
    imports:[
        //MenuModule,
        RouterModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        NgxSpinnerModule,
    ],
    entryComponents: [NotificacionModalComponent, BusquedaModalComponent]
})
export class SharedModule {}