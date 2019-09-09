import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

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

    constructor(private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.spinner.show();

        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
        }, 5000);
    }




}