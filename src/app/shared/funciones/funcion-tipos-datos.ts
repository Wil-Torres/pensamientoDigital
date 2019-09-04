export { };

declare global {
  interface Number {
    round(precision: number): number;
  }
}

export function round(number: number, precision: number): number {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

Number.prototype.round = function(precision: number): number {
  return round(this, precision);
};

declare global {
    interface String {
      horaEstandar(hora: string): string;
    }
  }
  
  String.prototype.horaEstandar = function () {
    const time = this.split(':');
    if (time.length === 0 || time.length === 1 ) {
      return '07:00:00';
    }
  
    if (time.length === 2) {
      return `${this}:00`;
    }
  
    return this;
  };

  export const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ];
  
  declare global {
    interface Date {
      meses: String[];
      inicioMes(): Date;
      finMes(): Date;
      inicioDia(): Date;
      fechaISO(): string;
      calcularFechaDeFechaISO(fecha: Date): Date;
      mesAnio(fecha: Date): string;
      convertirFechaUrl(): string;
      fechaEstandar(separator: string): string;
      fechaHoraEstandar(separator: string): string;
      horaMinutos(): string;
    }
  }
  
  Date.prototype.meses = meses;
  
  Date.prototype.inicioMes = function (): Date {
    return new Date(this.getFullYear(), this.getMonth(), 1);
  };
  
  Date.prototype.finMes = function (): Date {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0);
  };
  
  Date.prototype.inicioDia = function (): Date {
    const date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
  };
  
  export function fechaISO(date: Date): string {
    return date.toISOString().substring(0, 10);
  }
  
  export function convertirFechaUrl(date: Date): string {
    return this.getFullYear() + '-' + (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1) + '-' + (this.getDate() < 10 ? '0' : '') +
      (this.getDate());
  }
  
  
  Date.prototype.fechaISO = function (): string {
    return fechaISO(this);
  };
  
  export function calcularFechaDeFechaISO(fechaIso: string): Date {
    const date = new Date(fechaIso);
    return new Date(date.setMinutes(date.getMinutes() + date.getTimezoneOffset()));
  }
  
  Date.prototype.mesAnio = function (fecha: Date): string {
    return fecha && `${this.meses[(fecha.getMonth())]}  /  ${fecha.getFullYear()}`;
  };
  
  export function fechaEstandar(date: Date, separator: string): string {
    if ((date.valueOf() - (date.getTimezoneOffset() * 60 * 1000)) === 0) {
      return '';
    }
    return (((date.getDate() < 10 ? '0' : '') + date.getDate()) +
      separator + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
      + separator + (date.getFullYear())).replace(/ /g, '');
  }
  
  Date.prototype.fechaEstandar = function (separator: string): string {
    return fechaEstandar(this, separator);
  };
  
  Date.prototype.fechaHoraEstandar = function (separator: string = '/'): string {
    if ((this.valueOf() - (this.getTimezoneOffset() * 60 * 1000)) === 0) {
      return '';
    }
    return `${this.getDate() < 10 ? '0' : ''}${this.getDate()}${separator}${this.getMonth() < 9 ? '0' : ''}${this.getMonth() + 1}` +
      `${separator}${this.getFullYear()} ${this.getHours() < 10 ? '0' : ''}${this.getHours()}:${this.getMinutes() < 10 ? '0' : ''}` +
      `${this.getMinutes()}:${this.getSeconds() < 10 ? '0' : ''}${this.getSeconds()}`;
  };
  
  Date.prototype.convertirFechaUrl = function () {
    return this.getFullYear() + '-' + (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1) + '-' +
      (this.getDate() < 10 ? '0' : '') + (this.getDate());
  };
  
  Date.prototype.horaMinutos = function () {
    return `${this.getHours() < 10 ? '0' : ''}${this.getHours()}:${this.getMinutes() < 10 ? '0' : ''}${this.getMinutes()}:00`;
  };
  

  declare global {
    interface Array<T> {
      update(arr: any[], clear?: boolean): T[];
    }
  }
  
  export function update(toArr: any[], ofArr: any[], clear: boolean = true): any[] {
    if (clear) {
      toArr.length = 0;
    }
    ofArr.forEach(item => toArr.push(item));
    return toArr;
  }
  
  Array.prototype.update = function (ofArr: any[], clear: boolean = true): any[] {
    return update(this, ofArr, clear);
  };
  