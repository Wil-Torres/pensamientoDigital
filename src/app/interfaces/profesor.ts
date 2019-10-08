import { pais, municipio, departamento } from "./alumno";
import { UserInfo } from "./login";

export interface Profesor {
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
    telefonoEmergencia: string;
    email: string;
    datosUsuario: usuarioProfesor;
    fechaCreacion: Date;
    fechaModificacion: Date;
    perfilCreaId: string;
    perfilCrea: UserInfo;
    perfilModificaId: string;
    perfilModifica: UserInfo;
    establecimiento: Establecimiento;
    informacionAcademica: InformacionAcademica;

}

export interface InformacionAcademica {
    titulo: string;
    nombreEstablecimiento: string;
}

export interface Establecimiento {
    fechaInicio: Date;
    puesto: number;
    fechaJubilacion: Date;
}

export interface usuarioProfesor {
    id: string;
    userId: string;
    password: string;
}






