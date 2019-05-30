import { RouterModule, Routes  } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { HomeComponent } from "./home/home.component";
import { AccountSettingComponent } from "./account-setting/account-setting.component";
import { TiendaComponent } from "./configuracion/tienda/tienda.component";
import { ListaClasesComponent } from "./principal/clases/lista-clases/lista-clases.component";
import { ListaGruposComponent } from "./principal/grupos/lista-grupos/lista-grupos.component";
import { ListaPanelComponent } from "./principal/panel-control/lista-panel/lista-panel.component";
import { ListaCatalogoComponent } from "./principal/catalogo/lista-catalogo/lista-catalogo.component";
import { ListaBbienvenidaComponent } from "./principal/bienvenida/lista-bbienvenida/lista-bbienvenida.component";
import { ListaNoticiasComponent } from "./principal/noticias/lista-noticias/lista-noticias.component";
import { ListaRecursosComponent } from "./principal/recursos/lista-recursos/lista-recursos.component";
import { ListaUsuariosComponent } from "./principal/usuarios/lista-usuarios/lista-usuarios.component";
import { CalendarioComponent } from "./principal/calendario/calendario/calendario.component";
import { ClaseComponent } from "./principal/clases/clase/clase.component";
import { LeccionNuevoEdicionComponent } from "./principal/clases/leccion-nuevo-edicion/leccion-nuevo-edicion.component";
import { ListaCursosComponent } from "./movimientosAlumnos/lista-cursos/lista-cursos.component";
import { CursosComponent } from "./movimientosAlumnos/cursos/cursos.component";
import { CalificacionesComponent } from "./movimientosAlumnos/calificaciones/calificaciones.component";
import { HistorialComponent } from "./movimientosAlumnos/historial/historial.component";
import { TrabajosComponent } from "./movimientosAlumnos/trabajos/trabajos.component";
const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'home', component: HomeComponent, data:{titulo: 'Home'}},
            {path: 'account-settings', component: AccountSettingComponent, data:{titulo: 'Account Settings'}},
            {path: 'configuracion', component: TiendaComponent, data:{titulo: 'Configuración Tienda'}},

            /* Clases */
            {path: 'clases/lista-clases', component: ListaClasesComponent, data:{titulo: 'Clases'}},
            {path: 'clases/lecciones', component: ClaseComponent, data:{titulo: 'Lecciónes'}},
            {path: 'clases/leccion/:id', component: LeccionNuevoEdicionComponent, data:{titulo: 'Lección'}},

            /* Alumnos */
            {path: 'cursos/all-cursos', component: ListaCursosComponent, data:{titulo: 'Todos los Cursos'}},
            {path: 'alumno/mis-cursos', component: ListaCursosComponent, data:{titulo: 'Lista Cursos asignados'}},
            {path: 'alumno/cursos', component: CursosComponent, data:{titulo: 'Curso'}},
            {path: 'alumno/calificaciones', component: CalificacionesComponent, data:{titulo: 'Calificaciones'}},
            {path: 'alumno/tareas', component: TrabajosComponent, data:{titulo: 'Tareas'}},
            {path: 'alumno/historial', component: HistorialComponent, data:{titulo: 'Historial'}},
            


            /* Grupos */
            {path: 'grupos/lista-grupos', component: ListaGruposComponent, data:{titulo: 'Grupos'}},

            /* Panel de Control */
            {path: 'panel/panel-control', component: ListaPanelComponent, data:{titulo: 'Panel de Control'}},

            /* Catalogo*/
            {path: 'catalogo/lista-catalogo', component: ListaCatalogoComponent, data:{titulo: 'Catálogo'}},

            /* Bienvenida*/
            {path: 'bienvenida', component: ListaBbienvenidaComponent, data:{titulo: 'Bienvenid@'}},

            /* Noticias*/
            {path: 'noticias', component: ListaNoticiasComponent, data:{titulo: 'Noticias'}},

            /* Noticias */
            {path: 'recursos', component: ListaRecursosComponent, data:{titulo: 'Recursos'}},

            /* Usuarios */
            {path: 'usuarios', component: ListaUsuariosComponent, data:{titulo: 'Usuarios'}},
            /* Calendario */
            {path: 'calendario', component: CalendarioComponent, data:{titulo: 'Calendario'}},


            {path: '', redirectTo: '/clases/lista-clases', pathMatch: 'full'},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );