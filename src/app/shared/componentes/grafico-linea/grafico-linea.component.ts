import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafico-linea',
  templateUrl: './grafico-linea.component.html',
  styleUrls: ['./grafico-linea.component.css']
})
export class GraficoLineaComponent implements OnInit {
  @Input() chartLabels: string[] = [];
  @Input() chartData: number[] = [];
  @Input() chartType: string = '';

  @Input() lineChartData: ChartDataSets[] = [];
  @Input() lineChartLabels: String[] = [];
  @Input() lineChartColors: Color[];
  @Input() lineChartLegend: any;
  @Input() lineChartType: string = '';


  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    
  };

  constructor() { }

  ngOnInit() {
    

  }

}
