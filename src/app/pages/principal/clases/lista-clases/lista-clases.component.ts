import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clases',
  template: `

    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th class="text-center"></th>
              <th>Clase</th>
              <th>Catedra</th>
              <th>Estudiantes</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of objeto">
              <td class="text-center">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" [name]="item.id" [id]="item.id" [(ngModel)]="item.seleccion">
                  <label class="form-check-label" [for]="item.id"></label>
                </div>
              </td>
              <td (click)="edicion(item.id)">{{item.clase}}</td>
              <td (click)="edicion(item.id)">{{item.catedra}}<p>{{item.grado}}</p></td>
              <td (click)="edicion(item.id)">{{item.estudiantes}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  `,
  styles: []
})
export class ListaClasesComponent implements OnInit {


  private _objeto: any[] = [];
  public get objeto(): any[] {
    return this._objeto;
  }
  public set objeto(v: any[]) {
    this._objeto = v;
  }


  constructor(private router: Router) { }

  ngOnInit() {
    this.objInit();
  }

  objInit() {
    this.objeto = [
      { id: 1, seleccion: false, clase: 'Computación 2do Basico', catedra: 'Computación', grado: '2do', estudiantes: 29 },
      { id: 2, seleccion: false, clase: 'Computación 1do Primaria', catedra: 'Computación', grado: '8do', estudiantes: 14 },
      { id: 3, seleccion: true, clase: 'Computación 2do primaria', catedra: 'Computación', grado: '4do', estudiantes: 15 },
      { id: 4, seleccion: false, clase: 'Computación 3do primaria', catedra: 'Computación', grado: '1do', estudiantes: 12 },
      { id: 5, seleccion: false, clase: 'Computación 4do primaria', catedra: 'Computación', grado: '5do', estudiantes: 17 },
      { id: 6, seleccion: true, clase: 'Computación 4do primaria', catedra: 'Computación', grado: '6do', estudiantes: 20 },
      { id: 7, seleccion: false, clase: 'Computación 6do primaria', catedra: 'Computación', grado: '3do', estudiantes: 19 },
      { id: 8, seleccion: false, clase: 'Computación 1do Basico', catedra: 'Computación', grado: '7do', estudiantes: 20 },
      { id: 9, seleccion: false, clase: 'Computación 3do Basico', catedra: 'Computación', grado: '9do', estudiantes: 15 },
      { id: 10, seleccion: false, clase: 'Computación 4do Bachider', catedra: 'Computación', grado: '10do', estudiantes: 14 },
      { id: 11, seleccion: false, clase: 'Computación 5do Bachider', catedra: 'Computación', grado: 'K', estudiantes: 23 },
      { id: 12, seleccion: false, clase: 'Computación 6do Perito Contador', catedra: 'Computación', grado: '11do', estudiantes: 14 },
      { id: 13, seleccion: false, clase: 'Computación 5do Perito Contador', catedra: 'Computación', grado: '10do', estudiantes: '' }
    ]
  }
  edicion(item: any) {
    this.router.navigate(['/clases/lecciones']);

  }

}
