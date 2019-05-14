import { Component, OnInit, Input } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styles: []
})
export class ContenidoComponent implements OnInit {
  detalle :any = {};
  
  private _listaSubTemas : any[] = [];
  public get listaSubTemas() : any[] {
    return this._listaSubTemas;
  }
  @Input('lista') public set listaSubTemas(v : any[]) {
    this._listaSubTemas = v;
  }
  

  constructor(private embedService: EmbedVideoService) { }

  ngOnInit() {
    this.objInit();
  }

  objInit () {
    this.listaSubTemas = [
      {id: 1, codigoSubTema: 1, descripcion: 'CALLBACKS', videoUrl: '', documento: ''},
      {id: 2, codigoSubTema: 1, descripcion: 'ASYNCRONOUS JAVASCRIPT', videoUrl: '', documento: ''},
      {id: 3, codigoSubTema: 1, descripcion: 'RUN TO COMPLETION AND THE EVENT LOOP', videoUrl: '', documento: ''},
      {id: 4, codigoSubTema: 1, descripcion: 'SUMMARY', videoUrl: '', documento: ''},
    ]
  }
  cancelar () {
    this.detalle = {};
  }
  agregarDetalle() {
    this.listaSubTemas.push(this.detalle);
    this.cancelar();
  }


}
