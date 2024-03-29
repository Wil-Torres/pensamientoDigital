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
import { GradosCursosComponent } from "./principal/administracion/grados-cursos/grados-cursos.component";
import { GradosMaestrosComponent } from "./principal/administracion/grados-maestros/grados-maestros.component";
import { ProfesoresComponent } from "./mantenimiento/profesores/profesores.component";
import { ListaProfesoresComponent } from "./mantenimiento/profesores/lista-profesores.component";
import { ListaAlumnosComponent } from "./mantenimiento/alumnos/lista-alumnos.component";
import { ReunionComponent } from "./principal/sala/reuniones/reunion.component";
import { CursosTrabajosComponent } from "./movimientosAlumnos/trabajos/cursos-trabajos/cursos-trabajos.component";
import { ChatComponent } from "./principal/noticias/chat/chat.component";
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
            {path: 'administracion', component: AdministracionComponent, data:{titulo: 'Adminsitración', roles:['reader']}, canActivate: [AuthGuard]},
            {path: 'reportes', component: ReportesComponent, data:{titulo: 'Reportes'}, canActivate: [AuthGuard]},
            {path: 'panel-usuarios', component: PanelComponent, data:{titulo: 'Panel de Usuarios'}, canActivate: [AuthGuard]},
            {path: 'cuentas-usuarios', component: CuentasComponent, data:{titulo: 'Cuentas de Usuarios'}, canActivate: [AuthGuard]},
            {path: 'nuevos-ingresos', component: InscripcionComponent, data:{titulo: 'Inscripción de Alumnos'}, canActivate: [AuthGuard]},
            {path: 'ciclos', component: CiclosComponent, data:{titulo: 'Ciclos Escolares'}, canActivate: [AuthGuard]},
            {path: 'ciclos/:id/grados-secciones', component: GradosSeccionesComponent, data:{titulo: 'Grados - Secciones'}, canActivate: [AuthGuard]},
            {path: 'carreras', component: CarrerasComponent, data:{titulo: 'Carreras'}},
            {path: 'asignar-cursos-grado/:id', component: GradosCursosComponent, data:{titulo: 'Asignacion de cursos para grados'}, canActivate: [AuthGuard]},
            {path: 'asignar-maestros-grado/:id', component: GradosMaestrosComponent, data:{titulo: 'Asignacion de maestros para grado'}, canActivate: [AuthGuard]},


            /* Clases */
            {path: 'clases/lista-clases', component: ListaClasesComponent, data:{titulo: 'Clases'}, canActivate: [AuthGuard]},
            {path: 'clase/:id/lecciones', component: ClaseComponent, data:{titulo: 'Lecciónes'}, canActivate: [AuthGuard]},
            {path: 'clase/:curso/leccion/:id', component: LeccionNuevoEdicionComponent, data:{titulo: 'Lección'}, canActivate: [AuthGuard]},

            /* Alumnos */
            {path: 'alumnos', component: ListaAlumnosComponent, data:{titulo: 'Mantenimiento Alumnos'}, canActivate: [AuthGuard]},
            {path: 'alumno/nuevo', component: AlumnosComponent, data:{titulo: 'Mantenimiento Alumnos'}, canActivate: [AuthGuard]},
            {path: 'alumno/:id', component: AlumnosComponent, data:{titulo: 'Mantenimiento Alumnos'}, canActivate: [AuthGuard]},
            {path: 'cursos/all-cursos', component: ListaCursosComponent, data:{titulo: 'Todos los Cursos'}},
            {path: 'alumno-mis-cursos', component: ListaCursosComponent, data:{titulo: 'Lista Cursos asignados'}},
            {path: 'alumno/cursos/:id', component: CursosComponent, data:{titulo: 'Curso'}},
            {path: 'alumno-calificaciones', component: CalificacionesComponent, data:{titulo: 'Calificaciones'}},
            {path: 'alumno-cursos-tareas', component: CursosTrabajosComponent, data:{titulo: 'Tareas de cursos asignados'}},
            {path: 'alumno-cursos-tareas/:id', component: TrabajosComponent, data:{titulo: 'Tareas de cursos asignados'}},
            {path: 'alumno-historial', component: HistorialComponent, data:{titulo: 'Historial'}},

            /* Profesores */
            {path: 'profesores', component: ListaProfesoresComponent, data:{titulo: 'Mantenimiento Profesores'}, canActivate: [AuthGuard]},
            {path: 'profesores/nuevo', component: ProfesoresComponent, data:{titulo: 'Mantenimiento Profesores'}, canActivate: [AuthGuard]},
            {path: 'profesores/:id', component: ProfesoresComponent, data:{titulo: 'Mantenimiento Profesores'}, canActivate: [AuthGuard]},

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

            /* Recursps */
            {path: 'recursos', component: ListaRecursosComponent, data:{titulo: 'Recursos'}},

            /* Usuarios */
            {path: 'usuarios', component: ListaUsuariosComponent, data:{titulo: 'Usuarios'}},
            {path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil'}},

            /* Calendario */
            {path: 'calendario', component: CalendarioComponent, data:{titulo: 'Calendario'}},

            /* Reuniones */
            {path: 'reunion', component: ReunionComponent, data:{titulo: 'Reunion'}},

            {path: 'reuniones', component: ChatComponent, data:{titulo: 'Reuniones'}},


            {path: '', redirectTo: '/administracion', pathMatch: 'full'},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );