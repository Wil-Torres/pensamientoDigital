import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { BusquedaModalComponent } from 'src/app/shared/componentes/busqueda-modal/busqueda-modal.component';
import { FiltroBusqueda } from 'src/app/shared/componentes/interfaces/comun';

@Component({
    selector: 'app-lista-panel',
    template: `
    <div class="card-deck">
      <div class="col-md-6">
          <div class="card mb-3">
          <div class="card-title">{{grafico.grafico1.leyenda}}</div>
          <app-grafico-dona [chartLabels]="grafico.grafico1.labels" [chartData]="grafico.grafico1.data"  [chartType]="grafico.grafico1.type"></app-grafico-dona>
              <div class="card-body">
                  <h5 class="card-title">GRAFICA # 1</h5>
                  <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
          </div>
      </div>
      <div class="col-md-6">
          <div class="card mb-3">
          <div class="card-title">{{grafico.grafico2.leyenda}}</div>
          <app-grafico-dona [chartLabels]="grafico.grafico2.labels" [chartData]="grafico.grafico2.data"  [chartType]="grafico.grafico2.type"></app-grafico-dona>
              <div class="card-body">
                  <h5 class="card-title">GRAFICA # 2</h5>
                  <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
          </div>
      </div>
      <div class="col-md-6">
          <div class="card mb-3">
          <div class="card-title">{{grafico.grafico3.leyenda}}</div>
          <app-grafico-dona [chartLabels]="grafico.grafico3.labels" [chartData]="grafico.grafico3.data"  [chartType]="grafico.grafico3.type"></app-grafico-dona>
              <div class="card-body">
                  <h5 class="card-title">GRAFICA # 3</h5>
                  <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
          </div>
      </div>
      <div class="col-md-6">
          <div class="card mb-3">
          <div class="card-title">{{grafico.grafico4.leyenda}}</div>
          <app-grafico-dona [chartLabels]="grafico.grafico4.labels" [chartData]="grafico.grafico4.data"  [chartType]="grafico.grafico4.type"></app-grafico-dona>
              <div class="card-body">
                  <h5 class="card-title">GRAFICA # 4</h5>
                  <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
          </div>
      </div>
    </div>
    <div>
  </div>
  <button type="button" (click)="mostrar()">mostrar</button>
  `,
    styles: []
})
export class ListaPanelComponent implements OnInit {
    // Doughnut
    grafico: any = {
        'grafico1': {
            'labels': ['Matematicas', 'Fisica1', 'Financiera'],
            'data': [24, 30, 46],
            'type': 'doughnut',
            'leyenda': 'Alumnos por curso'
        },
        'grafico2': {
            'labels': ['Hombres', 'Mujeres'],
            'data': [4500, 6000],
            'type': 'doughnut',
            'leyenda': 'Alumnos'
        },
        'grafico3': {
            'labels': ['Reforzar', 'Bien', 'Excelente'],
            'data': [5, 5, 90],
            'type': 'doughnut',
            'leyenda': 'Promedio Alumnos'
        },
        'grafico4': {
            'labels': ['No', 'Si'],
            'data': [15, 85],
            'type': 'doughnut',
            'leyenda': 'Tareas Entregadas Global'
        },
    };
    private _modalRef: BsModalRef;
    private _objeto: any = {};
    private _filtroId = 'id';
    private _claseModal: string;
    private _filtroDesc = 'descripcion';
    private _filtroLista = 'lista';
    private _tituloModal: string;
    private _modelo: string;
    private _campoListaId = '';
    private _campos: any[] = [
        {
            clase: 'text-center',
            titulo: 'Codigo',
            nombre: 'id'
        },
        {
            clase: '',
            titulo: 'Descripción',
            nombre: 'nombreCompleto'
        }];
    private _campoDescripcion: any[] = [
        { id: 'id', descripcion: 'descripcion' }];
    private _bloqueado = false;
    private _incluye = true;
    private _recurso: any;
    private _seleccionados = [];
    private _filtros: FiltroBusqueda[];
    private _tipoVario: boolean;
    constructor(private spinner: NgxSpinnerService, private modalService: BsModalService) { }

    ngOnInit() {
        this.spinner.show();

        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
        }, 5000);
    }

    mostrar() {
        const estado = {
            initialState: {
                titulo: 'titulo de Modal'
            },
            class: "modal-lg"
        };
        this._modalRef = this.modalService.show(BusquedaModalComponent, estado);
        this._modalRef.content.recurso = this._recurso;
        this._modalRef.content.tipoVario = this._tipoVario;
        this._modalRef.content.campos = this._campos;
        this._modalRef.content.campoDescripcion = this._campoDescripcion;
        this._modalRef.content.filtros = this._filtros;
        this._modalRef.content.buscar();

    }




}