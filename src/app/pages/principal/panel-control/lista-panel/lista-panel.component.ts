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
                <div class="card-title text-center font-weight-bold">{{grafico.grafico5.leyenda}}</div>
                <app-grafico-linea [lineChartLabels]="grafico.grafico5.labels" [lineChartData]="grafico.grafico5.data"
                    [lineChartType]="grafico.grafico5.type" [lineChartColors]="grafico.grafico5.colors" [lineChartLegend]="grafico.grafico5.leyenda">
                </app-grafico-linea>
                <div class="card-body">
                    <p class="card-text">Movimiento de ventas respecto al Item</p>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card mb-3">
                <div class="card-title text-center font-weight-bold">{{grafico.grafico6.leyenda}}</div>
                <app-grafico-linea [lineChartLabels]="grafico.grafico6.labels" [lineChartData]="grafico.grafico6.data"
                    [lineChartType]="grafico.grafico6.type" [lineChartColors]="grafico.grafico6.colors" [lineChartLegend]="grafico.grafico6.leyenda">
                </app-grafico-linea>
                <div class="card-body">
                    <p class="card-text">Compartivo de utilidades entre 2018 y 20109.</p>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card mb-3">
                <div class="card-title text-center font-weight-bold">{{grafico.grafico7.leyenda}}</div>
                <app-grafico-linea [lineChartLabels]="grafico.grafico7.labels" [lineChartData]="grafico.grafico7.data"
                    [lineChartType]="grafico.grafico7.type" [lineChartColors]="grafico.grafico7.colors" [lineChartLegend]="grafico.grafico7.leyenda">
                </app-grafico-linea>
                <div class="card-body">
                    <p class="card-text">Comportamiento de las existencias por mes.</p>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card mb-3">
                <div class="card-title text-center font-weight-bold">{{grafico.grafico9.leyenda}}</div>
                <app-grafico-linea [lineChartLabels]="grafico.grafico9.labels" [lineChartData]="grafico.grafico9.data"
                    [lineChartType]="grafico.grafico9.type" [lineChartColors]="grafico.grafico9.colors" [lineChartLegend]="grafico.grafico9.leyenda">
                </app-grafico-linea>
                <div class="card-body">
                    <p class="card-text">Tendencia de ventas segun el comportamiento.</p>
                </div>
            </div>
        </div>        
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
        'grafico5': {
            'labels': ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            'data': [
                { 'data': [74, 71, 12, 51, 23, 17, 62, 95, 8, 39, 70, 10], 'label': '2017' },
                { 'data': [58, 274, 18, 25, 27, 3, 154, 28, 15, 45, 52, 20], 'label': '2018' },
                { 'data': [30, 47, 47, 63, 23, 42, 31, 39, 22, 44, 32, 25], 'label': '2019' },
                { 'data': [2, 0, 0, 0, 4, 28, 0, 5, 83, 57, 23, 12], 'label': '2020' }
            ],
            'type': 'line',
            'leyenda': 'Grafica de Ventas',
            'colors': [
                { // grey
                    
                    'borderColor': 'rgba(77,83,96,1)',
                    
                },
                { // dark grey
                    
                    'borderColor': 'rgba(77, 198, 0,1)',
                    
                    
                },
                { // red
                    
                    'borderColor': 'red',
                    
                },
                { // grey
                    
                    'borderColor': 'rgba(252, 125, 0,1)',
                    
                },
            ]

        },
        'grafico6': {
            'labels': ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            'data': [
                { 'data': [61704.0168, 98941.9701, 99821.5288, 132001.3065, 51035.9771, 85537.94, 65482.3287, 82413.9521, 42881.9568, 91432.0221, 63955.0093, 51800.7889], 'label': '2019' },
                { 'data': [131846.2532, 614019.0106, 39794.9883, 45430.7778, 54402.7061, 6844.2848, 338728.5689, 61527.5851, 32343.3142, 98467.5619, 110626.0029, 42121.6331], 'label': '2018' }
            ],
            'type': 'line',
            'leyenda': 'Grafica de Utilidades',
            'colors': [
                { // grey
                    'backgroundColor': 'rgba(77,83,96,0.2)',
                    'borderColor': 'rgba(77,83,96,1)',
                    'pointBackgroundColor': 'rgba(77,83,96,1)',
                    'pointBorderColor': '#fff',
                    'pointHoverBackgroundColor': '#fff',
                    'pointHoverBorderColor': 'rgba(77,83,96,1)'
                },
                { // red
                    'backgroundColor': 'rgba(255,0,0,0.3)',
                    'borderColor': 'red',
                    'pointBackgroundColor': 'rgba(148,159,177,1)',
                    'pointBorderColor': '#fff',
                    'pointHoverBackgroundColor': '#fff',
                    'pointHoverBorderColor': 'rgba(148,159,177,0.8)'
                }
            ]

        },
        'grafico7': {
            'labels': ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            'data': [
                { 'data': [1530,1850,1570,1355,991,835,1273,1237,1660,1502,1208,1009], 'label': '2019' },                
            ],
            'type': 'bar',
            'leyenda': 'Existencias por Mes',
            'colors': [
                { // red
                    'backgroundColor': 'rgba(255,0,0,0.3)',
                    'borderColor': 'red',
                    'pointBackgroundColor': 'rgba(148,159,177,1)',
                    'pointBorderColor': '#fff',
                    'pointHoverBackgroundColor': '#fff',
                    'pointHoverBorderColor': 'rgba(148,159,177,0.8)'
                }
            ]

        },
        'grafico8': {
            'labels': [2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,
                2021,2022,2023,2024,2025,],
            'data': [
                { 'data': [1305,1034,1374,1425,989,1575,1389,1425,1678,1875,1752.6,,,,,,,,], 'label': 'Valores' },                
                { 'data': [,,,,,,,,,,1752.6,2018.595279,2093.417247,1765.688073,2227.713636,2302.535605,
                    1974.806431,2436.831994,2511.653963
                  ], 'label': 'Previsión' 
                },
                { 'data': [,,,,,,,,,,1752.60,1744.84,1817.46,1487.52,1947.28,2019.85,1689.86,2149.57,2222.09], 'label': 'Limite Superior' },                
                { 'data': [,,,,,,,,,,1752.60,2292.35,2369.37,2043.86,2508.15,2585.22,2259.76,2724.10,2801.22], 'label': 'Limite Inferior' },                

            ],
            'type': 'line',
            'leyenda': 'Pronostico de venta para los proximos 5 años',
            'colors': [
                { // red
                    'borderColor': 'red',
                },
                { // blue
                    'borderColor': 'blue',
                },
                { // blue
                    'borderColor': 'blue',
                },
                { // blue
                    'borderColor': 'blue',
                }
            ]

        },
        'grafico9': {
            'labels': ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            'data': [
                { 'data': [58,274,18,25,27,,,,,,,,], 'label': 'Unidades Vendidas' },                
                { 'data': [,,,,27,-5.65409519597027,-272.991826254831,-127.269021768581,,,], 'label': 'Pronostico a 3 meses' 
                },
                { 'data': [,,,,27,-216.139994646141,-485.168399291804,-341.175931972016,,,], 'label': 'Limite Inferior' },                
                { 'data': [,,,,27,204.831804254201,-60.8152532178582,86.637888434854,,,], 'label': 'Limite Superior' },                

            ],
            'type': 'line',
            'leyenda': 'Pronostico de Ventas para los proximos 3 meses',
            'colors': [
                { // red
                    'borderColor': 'red',
                },
                { // blue
                    'borderColor': 'blue',
                },
                { // blue
                    'borderColor': 'blue',
                    'borderWidth': 1,
                },
                { // blue
                    'borderColor': 'blue',
                    'borderWidth': 1,
                }
            ]

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