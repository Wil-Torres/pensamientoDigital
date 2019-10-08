import { Ciclo, gradoSeccion } from "../pages/principal/administracion/administracion.service";
import { UserInfo } from "./login";

export interface Alumno {
  id: string
  cui: number;
  primerNombre: string;
  segundoNombre: string;
  otrosNombres: string;
  primerApellido: string;
  segundoApellido: string;
  otrosApellidos: string;
  fechaNacimiento: Date;
  departamenoNacimientoId: string;
  departamenoNacimiento: departamento;
  municipioNacimientoId: string;
  municipioNacimiento: municipio;
  direccionNacimiento: string;
  departamentoResidenciaId: string;
  departamentoResidencia: departamento;
  municipioResidenciaId: string;
  municipioResidencia: municipio;
  direccionResidencia: string;
  generoId: number;
  nacionalidadId: number;
  nacionalidad: pais;
  lateralidadId: number;
  estadoCivil: number;
  telefono: string;
  facebook: string;
  email: string;
  skype: string;
  datosMadre: responsable;
  datosPadre: responsable;
  datosUsuario: usuarioAlumno;
  paralelo: boolean;
  jornada: number;
}


export interface usuarioAlumno {
  id: string;
  userId: string;
  password: string;
}
export interface pais {
  id: string;
  pais: string;
}
export interface departamento {
  id: string;
  departamento: string;
  paisId: string;
}
export interface municipio {
  id: string;
  municipio: string;
  departamentoId: string
}

export interface responsable {
  nombres: string;
  apellidos: string;
  identificacion: string;
  parentescoId: number;
  telefonoCasa: string;
  telefonoMovil: string;
}

export interface estadoCiclo {
  id: string;
  estado: string;
}

export interface inscripcion {
  id: string;
  alumnoId: string;
  alumno: Alumno;
  cicloId: string;
  ciclo: Ciclo;
  gradoId: string;
  grado: gradoSeccion;
  estadoId: string;
  estado: estadoCiclo;
  fechaCreacion: Date;
  perfilCreaId: string;
  perfilCrea: UserInfo;
  fechaModificacion: Date;
  perfilModificaId: string;
  perfilModifica: UserInfo
}





