import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-lista-recursos',
  template: `
  <div class="row">
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary" (click)="agregarRecurso(template)">añadir</button>
      <button type="button" class="btn btn-danger" (click)="eliminarRecurso()">Eliminar</button>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead class="bg-primary text-light">
          <tr>
            <th class="gt-wd-25"></th>
            <th class="gt-wd-25">#</th>
            <th>Recurso</th>
            <th class="gt-wd-75">Tamaño</th>
            <th class="gt-wd-100">Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of recursos; let i = index">
            <td><input type="checkbox" class="form-check-*" [(ngModel)]="item.seleccionar" [id]="'item' + item.id">
              <label class="form-check-label" [for]="'item' + item.id"></label>
            </td>
            <td>{{i+1}}</td>
            <td>{{item.recurso}}</td>
            <td>{{item.tamanio}}</td>
            <td>{{item.fechaCreacion}}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>


  <ng-template #template>
    <div class="modal-header">
      <h4 class="modal-title pull-left">Subir Archivo</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="modalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <nav>
        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav-local-tab" data-toggle="tab" href="#nav-local" role="tab"
            aria-controls="nav-local" aria-selected="true">Local</a>
          <a class="nav-item nav-link" id="nav-existente-tab" data-toggle="tab" href="#nav-existente" role="tab"
            aria-controls="nav-existente" aria-selected="false">Existentes</a>
          <a class="nav-item nav-link" id="nav-fuentes-tab" data-toggle="tab" href="#nav-fuentes" role="tab"
            aria-controls="nav-fuentes" aria-selected="false">Agregar Fuentes</a>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-local" role="tabpanel" aria-labelledby="nav-local-tab">
          <div class="card" style="height: 150px;">
            <div class="form-control">
              <label for="cargaArchivo">Cargando Archivo</label>
              <input type="file" name="cargaArchivo" id="cargaArchivo">
            </div>
          </div>

        </div>
        <div class="tab-pane fade" id="nav-existente" role="tabpanel" aria-labelledby="nav-existente-tab">
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead class="bg-primary text-light">
                <tr>
                  <th class="gt-wd-25"></th>
                  <th>Recurso</th>
                  <th class="gt-wd-75">Tamaño</th>
                  <th class="gt-wd-100">Fecha de creación</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of recursoExistente">
                  <td><input type="radio" class="form-check-*" [(ngModel)]="seleccionaExistente" [value]="item"
                      [id]="'exist' + item.id">
                    <label class="form-check-label" [for]="'exist' + item.id"></label>
                  </td>
                  <td>{{item.recurso}}</td>
                  <td>{{item.tamanio}}</td>
                  <td>{{item.fechaCreacion}}</td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>
        <div class="tab-pane fade" id="nav-fuentes" role="tabpanel" aria-labelledby="nav-fuentes-tab">

        </div>
      </div>
    </div>
  </ng-template>
  `,
  styles: []
})
export class ListaRecursosComponent implements OnInit {
  modalRef: BsModalRef | null;
  private _recursos: any[] = [];
  recursoExistente: any[] = [];
  seleccionaExistente: any;
  public get recursos(): any[] {
    return this._recursos;
  }
  public set recursos(v: any[]) {
    this._recursos = v;
  }


  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.initObj();
  }

  initObj() {
    this.recursos = [
      { id: 1, seleccionar: false, recurso: 'Documentos Word', enlace: 'no tiene', fechaCreacion: '10/08/2019', tamanio: '1 MB' },
      { id: 2, seleccionar: false, recurso: 'Documentos Excel', enlace: 'no tiene', fechaCreacion: '11/08/2019', tamanio: '1 MB' },
      { id: 3, seleccionar: false, recurso: 'Ejecutable', enlace: 'no tiene', fechaCreacion: '12/08/2019', tamanio: '3 MB' },
      { id: 4, seleccionar: false, recurso: 'Maquetaciones web', enlace: 'no tiene', fechaCreacion: '13/08/2019', tamanio: '5 MB' },
      { id: 5, seleccionar: false, recurso: 'Otros', enlace: 'no tiene', fechaCreacion: '14/08/2019', tamanio: '15 MB' },
    ]

    this.recursoExistente = [
      { id: 6, recurso: 'VS 2013', enlace: 'no tiene', fechaCreacion: '10/08/2019', tamanio: '1 MB' },
      { id: 7, recurso: 'Android Studio', enlace: 'no tiene', fechaCreacion: '11/08/2019', tamanio: '1 MB' },
      { id: 8, recurso: 'VS Code 10.8', enlace: 'no tiene', fechaCreacion: '12/08/2019', tamanio: '3 MB' },
      { id: 9, recurso: 'Node.js', enlace: 'no tiene', fechaCreacion: '13/08/2019', tamanio: '5 MB' },
      { id: 10, recurso: 'Git', enlace: 'no tiene', fechaCreacion: '14/08/2019', tamanio: '15 MB' }
    ]

  }

  agregarRecurso(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  eliminarRecurso() { }
}