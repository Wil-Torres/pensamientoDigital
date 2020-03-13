export interface MenuBase {
    id: string;
    nombre: string;
    icono: string;
    url: string;
    dataIcon?: string;
    pIcon?: string;

  }
  
  export interface Item extends MenuBase {
    subMenu: Item[];
    tag: number;
  }
  
  export interface Modulo extends MenuBase {
    subMenu: Item[];
    tag: number;
  }
  
  export interface Menu {
    mostrar: boolean;
    modulos: Modulo[];
    alternar(): void;
    abrir(): void;
    cerrar(): void;
  }
  