import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

interface ParamsPaginacion {
  offset: number;
  limit: number;
}

@Component({
  selector: 'app-paginacion',
  template: `
  <div class="d-flex justify-content-around" *ngIf="mostrarTitulos">
    <span><b>Registros del {{itemInicio}} al {{itemFin}} de {{totalItems}}</b></span>
    <span><b>Página {{page}} de {{numPages}}</b></span>
  </div>
  <div class="row d-flex justify-content-center">
    <pagination [boundaryLinks]="true" [totalItems]="totalItems" [itemsPerPage]="itemsPerPage" previousText="&lsaquo;" nextText="&rsaquo;"
      firstText="&laquo;" lastText="&raquo;" (numPages)="numPages = $event" (pageChanged)="cambioPagina($event)"
      [maxSize]="cantidadPaginas">
    </pagination>
    <div *ngIf="!disabled" class="d-flex justify-content-center">
      <select class="form-control" [(ngModel)]="itemsPerPage" (ngModelChange)="cambioItemsPerPagina($event)">
        <option *ngFor="let valor of [5, 10, 25, 50, 100, 150]" [ngValue]="valor">{{valor}}</option>
      </select>
    </div>
  </div>`,
  styles: []
})
export class PaginacionComponent implements OnInit {
  private _itemsPerPage: number;
  private _totalItems: number;
  private _numPages: number;
  private _page: number;
  private _cantidadPaginas = 10;
  private _disabled: boolean;
  private _mostrarTitulos: boolean;
  private _paginacion: EventEmitter<ParamsPaginacion> = new EventEmitter<ParamsPaginacion>();
  private _itemsPorPagina: EventEmitter<number> = new EventEmitter<number>();
  constructor() {
    this._page = 1;
    this._itemsPerPage = 5;
    this._totalItems = 0;
    this._disabled = false;
    this._mostrarTitulos = true;
  }

  ngOnInit() {
  }

  cambioPagina(event: PageChangedEvent) {
    this._page = event.page;
    this.emitirFiltros();
  }

  cambioItemsPerPagina(itemsPerPage: number) {
    this._numPages = Math.ceil(this._totalItems / itemsPerPage);
    this._itemsPorPagina.emit(itemsPerPage);
    this.emitirFiltros();
  }

  emitirFiltros() {
    this._paginacion.emit({
      offset: (this._page - 1) * this._itemsPerPage,
      limit: this._itemsPerPage
    });
  }

  @Input() set itemsPerPage(value: number) {
    this._itemsPerPage = value;
  }

  get totalItems(): number {
    return this._totalItems;
  }

  @Input() set totalItems(value: number) {
    this._totalItems = value;
  }

  set numPages(value: number) {
    this._numPages = value;
  }

  set page(value: number) {
    this._page = value;
  }

  @Input() set disabled(value: boolean) {
    this._disabled = value;
  }

  @Input() set mostrarTitulos(value: boolean) {
    this._mostrarTitulos = value;
  }

  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  get numPages(): number {
    return this._numPages;
  }

  get page(): number {
    return this._page;
  }

  get cantidadPaginas(): number {
    return this._cantidadPaginas;
  }

  @Input() set cantidadPaginas(value: number) {
    this._cantidadPaginas = value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  get mostrarTitulos(): boolean {
    return this._mostrarTitulos;
  }

  get itemInicio(): number {
    return ((this._page - 1) * this._itemsPerPage) + 1;
  }

  get itemFin(): number {
    const fin = this._page * this._itemsPerPage;
    return (((fin - this.itemInicio + 1) !== this._itemsPerPage) || (fin > this._totalItems)) ? this._totalItems : fin;
  }

  @Output() get paginacion(): EventEmitter<ParamsPaginacion> {
    return this._paginacion;
  }

  @Output() get itemsPorPagina(): EventEmitter<number> {
    return this._itemsPorPagina;
  }
}
