import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RecursosService } from '../recursos.service';
import { isThisSecond } from 'date-fns';

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
            <th class="gt-wd-75">Tipo Archivo</th>
            <th class="gt-wd-100">Tamaño</th>
            <th class="gt-wd-100">Fecha de creación</th>
            <th class="gt-wd-75">Descargar</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of recursos; let i = index">
            <td><input type="checkbox" class="form-check-*" [(ngModel)]="item.seleccionar" [id]="'item' + item.id">
              <label class="form-check-label" [for]="'item' + item.id"></label>
            </td>
            <td>{{i+1}}</td>
            <td>{{item.nombre}}</td>
            <td>{{item.tipoArchivo}}</td>
            <td class="text-right">{{(item.tamanio ? (item.tamanio / 1000) : 0) | number:'0.2-2'}} KB</td>
            <td>{{item.fechaCreacion.toDate() | date:'dd/MM/yyyy'}}</td>
            <td class="text-center">
              <a [href]="item.url" download><i class="fa fa-download text-success"></i>
              </a>
            </td>
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
              <input type="file" name="files" id="files" (change)="cargarInfo( $event.target.files )">
            </div>
          </div>

        </div>
        <div class="tab-pane fade" id="nav-existente" role="tabpanel" aria-labelledby="nav-existente-tab">
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead class="bg-primary text-light">
                <tr>
                  <th class="gt-wd-25"></th>
                  <th class="gt-wd-25">#</th>
                  <th>Recurso</th>
                  <th class="gt-wd-75">Tipo Archivo</th>
                  <th class="gt-wd-100">Tamaño</th>
                  <th class="gt-wd-100">Fecha de creación</th>
                  <th class="gt-wd-75">Descargar</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of recursos; let i = index">
                  <td><input type="radio" class="form-check-*" [(ngModel)]="seleccionaExistente" [value]="item"
                      [id]="'exist' + item.id">
                    <label class="form-check-label" [for]="'exist' + item.id"></label>
                  </td>
                  <td>{{i+1}}</td>
                  <td>{{item.nombre}}</td>
                  <td>{{item.tipoArchivo}}</td>
                  <td class="text-right">{{(item.tamanio ? (item.tamanio / 1000) : 0) | number:'0.2-2'}} KB</td>
                  <td>{{item.fechaCreacion.toDate() | date:'dd/MM/yyyy'}}</td>
                  <td class="text-center">
                    <a [href]="item.url" download><i class="fa fa-download text-success"></i>
                    </a>
                  </td>
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


  constructor(private modalService: BsModalService, private srvRecurso: RecursosService) { }

  ngOnInit() {
    this.initObj();
  }

  initObj() {
    this.srvRecurso.getAllRecursos().subscribe(resp => {
      this.recursos = resp;
    })
  }

  agregarRecurso(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  eliminarRecurso(item: any) {
    this.recursos.forEach(element => {
      if (element.seleccionar) {
        this.srvRecurso.removeRecurso(element);
      }
    });
  }

  cargarInfo(archivo: FileList) {
    this.srvRecurso.addRecurso(archivo);
  }
}