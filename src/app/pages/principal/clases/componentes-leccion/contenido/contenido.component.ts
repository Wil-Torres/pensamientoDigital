import { Component, OnInit, Input } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styles: []
})
export class ContenidoComponent implements OnInit {
  detalle :any = {};
  private _forma : FormGroup;
  public get forma() : FormGroup {
    return this._forma;
  }
  @Input() public set forma(v : FormGroup) {
    this._forma = v;
  }
   constructor() { }

  ngOnInit() {}

  objInit () {}
  cancelar () {
    this.detalle = {};
  }
  agregarDetalle() {
    this.forma.value.contenido.push(this.detalle)
    this.cancelar();
  }


}
