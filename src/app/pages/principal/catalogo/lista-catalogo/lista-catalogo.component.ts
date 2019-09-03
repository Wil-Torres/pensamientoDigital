import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../catalogo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-catalogo',
  template: `
    <div class="card-deck">
      <div class="col-md-3" *ngFor="let obj of objeto; let i = index" (click)="mostrarDetalle(obj)">
        <div class="card">
            <img [src]="obj.imagen" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{obj.descripcion}}</h5>
                <p class="card-text">SubCategoria - {{obj.descripcion}}.</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">10 cursos</small>
            </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ListaCatalogoComponent implements OnInit {

  private _objeto: any = [];
  public get objeto(): any[] {
    return this._objeto;
  }
  public set objeto(v: any[]) {
    this._objeto = v;
  }

  constructor(private srvCatalogo: CatalogoService, private router: Router) { }

  ngOnInit() {
    this.srvCatalogo.obtenerCatalogo().subscribe((res: any) => {
      console.log(res)
      res.forEach(element => {
        element.imagen = '../../../../../assets/images/Nueva carpeta/descarga.svg';
      });
      this.objeto = res;
    })
  }

  mostrarDetalle(item: any) {
    this.router.navigate(['catalogo/lista-catalogo', item.id]);
  }

}
