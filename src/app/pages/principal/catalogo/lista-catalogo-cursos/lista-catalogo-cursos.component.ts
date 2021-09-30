import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoService } from '../catalogo.service';

@Component({
  selector: 'app-lista-catalogo-cursos',
  templateUrl: './lista-catalogo-cursos.component.html',
  styleUrls: ['./lista-catalogo-cursos.component.css']
})
export class ListaCatalogoCursosComponent implements OnInit {
  private _objetoId: string = this.aRouter.snapshot.paramMap.get('id');;
  private _objeto: any = [];
  flDocto: FileList;
  numeroRegistro: number;

  public get objetoId(): string {
    return this._objetoId;
  }
  public get objeto(): any[] {
    return this._objeto;
  }
  public set objeto(objeto: any[]) {
    this._objeto = objeto;
  }

  constructor(private aRouter: ActivatedRoute, private router: Router, private srvCatalogo:CatalogoService) {
  }

  ngOnInit() {
    this.srvCatalogo.obtenerCursos(this.objetoId).then(res => {
      res.subscribe((resp:any) => {
        this.numeroRegistro = resp.length
        resp.forEach((element:any) => {
          if (!element.imagen) {
            element.imagen = '../../../../../assets/images/Nueva carpeta/descarga.svg';
          }
        });
        this.objeto = resp;
      })
    });
  }

  irCurso(item: any) {
    this.router.navigate(['/clase/' + item + '/lecciones/']);
  }

}
