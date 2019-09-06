import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private static mensajeDefault = 'Cargando datos ...';
  private _locked = false;
  private _lockCount = 0;
  private _mensaje = CoreService.mensajeDefault;
  constructor(private http: HttpClient) { }

  lock(): void {
    this._locked = true;
    this._lockCount++;
  }

  unlock(reset: boolean = false): void {
    this._lockCount--;
    if (reset || this._lockCount < 0) {
      this._lockCount = 0;
    }
    this._locked = this._lockCount !== 0;
    this._mensaje = CoreService.mensajeDefault;
  }

  get locked(): boolean {
    return this._locked;
  }

  set locked(value: boolean) {
    this._locked = value;
  }

  get mensaje(): string {
    return this._mensaje;
  }

  set mensaje(value: string) {
    this._mensaje = value;
  }
  
}
