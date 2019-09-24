import { Component, OnInit, EventEmitter } from '@angular/core';
import { FiltroBusqueda } from '../interfaces/comun';
import { BsModalRef } from 'ngx-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';

interface CampoFiltro {
  clase: string;
  titulo: string;
  nombre: string;
}

interface CampoDescripcion {
  id: string;
  descripcion: string;
}

@Component({
  selector: 'app-busqueda-modal',
  templateUrl: './busqueda-modal.component.html',
  styles: [`
  .w-65 {
    width: 60%;
  }
  .w-35 {
      width: 40%;
  }
  `]
})
export class BusquedaModalComponent implements OnInit {
  private _registros: any[] = [];
  private _seleccionados = [];
  private _campos: CampoFiltro[] = [];
  private _campoDescripcion: CampoDescripcion[] = [];
  private _totalItems = 10;
  private _titulo: string;
  private _recurso: any;
  private _seleccion: EventEmitter<any[]>;
  private _filtros: FiltroBusqueda[] = [];
  private _tipoVario: boolean;

  constructor(private modalRef: BsModalRef, private afs: AngularFirestore) { }

  ngOnInit() {
    this._seleccion = new EventEmitter<any[]>();
    this._registros = [{},{},{}];
  }

  async buscar(offset: number = 0, limit: number = 10) {
    
    this.afs.collection('alumnos').valueChanges().subscribe((resp:any) => {
      resp.forEach(elem=>{
        elem.nombreCompleto = elem.nombres + ' ' + elem.apellidos;
      })
      this._registros = resp;
      this._totalItems = resp.length;
    })
  }

  selecccionar(registro) {
    const existe = this._seleccionados.find(e => e.id === registro.id);
    if (!existe || undefined) {
      registro.desc = registro.desc || this.campos.reduce(
        (desc, campo, index) => `${desc}${index === 0 ? '' : ' '}${registro[campo.nombre]}`, '');
      this._seleccionados.push(registro);
    }
  }
  eliminar(index: number) {
    this._seleccionados.splice(index, 1);
  }
  agregar() {
    this._seleccion.emit(this._seleccionados);
    this.modalRef.hide();
  }

  cancelar() {
    this.modalRef.hide();
  }

  get registros(): any[] {
    return this._registros;
  }

  set registros(value: any[]) {
    this._registros = value;
  }

  get totalItems(): number {
    return this._totalItems;
  }

  set totalItems(value: number) {
    this._totalItems = value;
  }

  get titulo(): string {
    return this._titulo;
  }

  set titulo(value: string) {
    this._titulo = value;
  }

  get campos(): CampoFiltro[] {
    return this._campos;
  }

  set campos(value: CampoFiltro[]) {
    this._campos = value;
  }

  get campoDescripcion(): CampoDescripcion[] {
    return this._campoDescripcion;
  }

  set campoDescripcion(value: CampoDescripcion[]) {
    this._campoDescripcion = value;
  }

  get recurso(): any {
    return this._recurso;
  }

  set recurso(value: any) {
    this._recurso = value;
  }

  get seleccionados(): any[] {
    return this._seleccionados;
  }

  set seleccionados(value: any[]) {
    this._seleccionados = value;
  }

  get seleccion(): EventEmitter<any> {
    return this._seleccion;
  }

  get filtros(): FiltroBusqueda[] {
    return this._filtros;
  }

  set filtros(v: FiltroBusqueda[]) {
    this._filtros = v;
  }

  get tipoVario(): boolean {
    return this._tipoVario;
  }

  set tipoVario(value: boolean) {
    this._tipoVario = value;
  }
}
