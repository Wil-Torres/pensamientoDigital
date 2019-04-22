import { RouterModule, Routes  } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { HomeComponent } from "./home/home.component";
import { AccountSettingComponent } from "./account-setting/account-setting.component";
import { MarcaListaComponent } from "./mantenimiento/marca/marca-lista.component";
import { MarcaNuevoComponent } from "./mantenimiento/marca/marca-nuevo.component";
import { MarcaEdicionComponent } from "./mantenimiento/marca/marca-edicion.component";
import { TiendaComponent } from "./configuracion/tienda/tienda.component";
const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'home', component: HomeComponent, data:{titulo: 'Home'}},
            {path: 'account-settings', component: AccountSettingComponent, data:{titulo: 'Account Settings'}},
            {path: 'lista-marcas', component: MarcaListaComponent, data:{titulo: 'Marca'}},
            {path: 'nueva-marca', component: MarcaNuevoComponent, data:{titulo: 'Marca'}},
            {path: 'edicion-marca', component: MarcaEdicionComponent, data:{titulo: 'Marca'}},
            {path: 'configuracion', component: TiendaComponent, data:{titulo: 'Configuracion Tienda'}},
            {path: '', redirectTo: '/home', pathMatch: 'full'},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );