export interface Base {
  id: any;
}

export interface CamposSeleccion {
    clase: string;
    titulo: string;
    nombre: string | string[];
    uppercase?: boolean;
    esFecha?: boolean;
    esArreglo?: boolean;
    esValor?: boolean;
  }
  
  export interface Filtro {
    titulo: string;
    valor: string;
    tipo: string;
    lista: any[];
    rango: string;
    nombresRango: string[];
  }
  
  export interface FiltroBusqueda {
    titulo: string;
    nombre: string;
    tipo: string;
    codificado: boolean;
    like: boolean;
    lista?: any[];
    rango?: boolean;
    nombresRango?: string[];
    valor?: any;
    estatico?: boolean;
  }