//  RUTAS PRINCIPALES
import { RouterModule, Routes } from '@angular/router'

// componentes para rutas principales
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ListaOperacionesComponent } from './security/lista-operaciones/lista-operaciones.component';

const appRoutes: Routes = [
    // ruta principal
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'listaSeg', component: ListaOperacionesComponent},
    {path: '**', component: NopagefoundComponent},
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true});


