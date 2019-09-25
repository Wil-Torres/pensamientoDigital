import { RouterModule, Routes  } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { HomeComponent } from "./home/home.component";
import { AccountSettingComponent } from "./account-setting/account-setting.component";
import { TiendaComponent } from "./configuracion/tienda/tienda.component";
import { ListaClasesComponent } from "./principal/clases/lista-clases/lista-clases.component";
import { ListaGruposComponent } from "./principal/grupos/lista-grupos/lista-grupos.component";
import { ListaPanelComponent } from "./principal/panel-control/lista-panel/lista-panel.component";
import { ListaCatalogoComponent } from "./principal/catalogo/lista-catalogo/lista-catalogo.component";
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
import { AuthGuard } from "../services/autenticacion/auth.guard";
import { NotificacionListaComponent } from "../shared/componentes/notificacioens/notificacion-lista.component";
import { AlumnosComponent } from "./mantenimiento/alumnos/alumnos.component";
import { AdministracionComponent } from "./principal/administracion/administracion.component";
import { ReportesComponent } from "./principal/reportes/reportes/reportes.component";
import { PanelComponent } from "./principal/usuarios/panel/panel.component";
import { ListaBienvenidaComponent } from "./principal/bienvenida/lista-bienvenida/lista-bienvenida.component";
import { NosotrosComponent } from "./principal/bienvenida/nosotros/nosotros.component";
import { CuentasComponent } from "./principal/administracion/cuentas/cuentas.component";
import { PerfilComponent } from "./configuracion/perfil/perfil.component";
import { ListaDetalleCatalogoComponent } from "./principal/catalogo/lista-detalle-catalogo/lista-detalle-catalogo.component";
import { ListaCatalogoCursosComponent } from "./principal/catalogo/lista-catalogo-cursos/lista-catalogo-cursos.component";
import { InscripcionComponent } from "./principal/administracion/inscripcion/inscripcion.component";
import { CiclosComponent } from "./principal/administracion/ciclos/ciclos.component";
import { GradosSeccionesComponent } from "./principal/administracion/grados-secciones/grados-secciones.component";
import { CarrerasComponent } from "./principal/administracion/carreras/carreras.component";
const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'home', component: HomeComponent, data:{titulo: 'Home'}},
            {path: 'account-settings', component: AccountSettingComponent, data:{titulo: 'Account Settings'}},
            {path: 'configuracion', component: TiendaComponent, data:{titulo: 'Configuración Tienda'}},
            {path: 'avisos', component: NotificacionListaComponent, data:{titulo: 'Avisos'}},

            /* administacion */
            {path: 'administracion', component: AdministracionComponent, data:{titulo: 'Adminsitracion'}, canActivate: [AuthGuard]},
            {path: 'reportes', component: ReportesComponent, data:{titulo: 'Reportes'}, canActivate: [AuthGuard]},
            {path: 'panel-usuarios', component: PanelComponent, data:{titulo: 'Panel de Usuarios'}, canActivate: [AuthGuard]},
            {path: 'cuentas-usuarios', component: CuentasComponent, data:{titulo: 'Cuentas de Usuarios'}, canActivate: [AuthGuard]},
            {path: 'nuevos-ingresos', component: InscripcionComponent, data:{titulo: 'Inscripción de Alumnos'}, canActivate: [AuthGuard]},
            {path: 'ciclos', component: CiclosComponent, data:{titulo: 'Ciclos Escolares'}, canActivate: [AuthGuard]},
            {path: 'ciclos/:id/grados-secciones', component: GradosSeccionesComponent, data:{titulo: 'Grados - Secciones'}, canActivate: [AuthGuard]},
            {path: 'carreras', component: CarrerasComponent, data:{titulo: 'Carreras'}, canActivate: [AuthGuard]},


            /* Clases */
            {path: 'clases/lista-clases', component: ListaClasesComponent, data:{titulo: 'Clases'}, canActivate: [AuthGuard]},
            {path: 'clase/:id/lecciones', component: ClaseComponent, data:{titulo: 'Lecciónes'}, canActivate: [AuthGuard]},
            {path: 'clase/:curso/leccion/:id', component: LeccionNuevoEdicionComponent, data:{titulo: 'Lección'}, canActivate: [AuthGuard]},

            /* Alumnos */
            {path: 'alumno', component: AlumnosComponent, data:{titulo: 'Mantenimiento Alumnos'}},
            {path: 'cursos/all-cursos', component: ListaCursosComponent, data:{titulo: 'Todos los Cursos'}},
            {path: 'alumno/mis-cursos', component: ListaCursosComponent, data:{titulo: 'Lista Cursos asignados'}},
            {path: 'alumno/cursos/:id', component: CursosComponent, data:{titulo: 'Curso'}},
            {path: 'alumno/calificaciones', component: CalificacionesComponent, data:{titulo: 'Calificaciones'}},
            {path: 'alumno/tareas', component: TrabajosComponent, data:{titulo: 'Tareas'}},
            {path: 'alumno/historial', component: HistorialComponent, data:{titulo: 'Historial'}},

            


            /* Grupos */
            {path: 'grupos/lista-grupos', component: ListaGruposComponent, data:{titulo: 'Grupos'}},

            /* Panel de Control */
            {path: 'panel/panel-control', component: ListaPanelComponent, data:{titulo: 'Panel de Control'}},

            /* Catalogo*/
            {path: 'catalogo/lista-catalogo', component: ListaCatalogoComponent, data:{titulo: 'Catálogo'}},
            {path: 'catalogo/lista-catalogo/:id', component: ListaDetalleCatalogoComponent, data:{titulo: 'Catálogo'}},
            {path: 'catalogo/:id/cursos', component: ListaCatalogoCursosComponent, data:{titulo: 'Catálogo Cursos'}},
           // {path: 'catalogo/lista-catalogo/:id/detalle/:detalleId', component: ListaCatalogoComponent, data:{titulo: 'Catálogo'}},


            /* Bienvenida*/
            {path: 'bienvenida', component: ListaBienvenidaComponent, data:{titulo: 'Bienvenido'}},
            {path: 'nosotros', component: NosotrosComponent, data:{titulo: 'Nosotros'}},

            /* Noticias*/
            {path: 'noticias', component: ListaNoticiasComponent, data:{titulo: 'Noticias'}},

            /* Noticias */
            {path: 'recursos', component: ListaRecursosComponent, data:{titulo: 'Recursos'}},

            /* Usuarios */
            {path: 'usuarios', component: ListaUsuariosComponent, data:{titulo: 'Usuarios'}},
            {path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil'}},

            /* Calendario */
            {path: 'calendario', component: CalendarioComponent, data:{titulo: 'Calendario'}},


            {path: '', redirectTo: '/panel/panel-control', pathMatch: 'full'},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );