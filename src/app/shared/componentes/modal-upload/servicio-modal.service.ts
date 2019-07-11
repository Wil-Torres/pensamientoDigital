import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioModalService {
  public oculto: string = 'oculto';
  public notificacion = new EventEmitter<any>();
  public objeto: any = {};
  public obj: Observable<{}>;
  constructor() {
  }
  ocultarModal() {
    this.oculto = 'oculto';
  }
  mostrarModal(id: string) {
    console.log(id);
    // obtener imagen;
  }
  
}
