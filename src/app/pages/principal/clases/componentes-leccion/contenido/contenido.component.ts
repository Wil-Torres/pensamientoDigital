import { Component, OnInit, Input } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { FormGroup } from '@angular/forms';
import { RecursosService } from '../../../recursos/recursos.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styles: []
})
export class ContenidoComponent implements OnInit {
  detalle :any = {};
  subContenido: any = {};
  tipoCargado: number = 1;
  tDocto: FileList;
  lineaSeleccionada: number;

  private _forma : FormGroup;
  public get forma() : FormGroup {
    return this._forma;
  }
  @Input() public set forma(v : FormGroup) {
    this._forma = v;
  }
   constructor(private srvRecurso: RecursosService ) { }

  ngOnInit() {}

  objInit () {}
  cancelar () {
    this.detalle = {};
  }
  agregarDetalle() {
    this.forma.value.contenido.push(this.detalle)
    this.cancelar();
  }

  agregarSubContendio (item:number) {

    if(this.tipoCargado === 1) {
      this.srvRecurso.addRecursoCurso('JNRSpYOiJEOGjFGrQJdy','PDatBCfKSLQ3hAmQimgp',0,this.tDocto).then(resp => {
        this.forma.value.contenido[this.lineaSeleccionada].detalle.push({
          url: resp, 
          tipo: this.subContenido.tipo, 
          visto: false
        })
        this.tDocto = new FileList;
      }).catch(err => {
        this.tDocto = new FileList;
      })
    } else {
      this.forma.value.contenido[this.lineaSeleccionada].detalle.push({
        url: this.subContenido.url, 
        tipo: this.subContenido.tipo, 
        visto: false
      })
    }
  }

  cargarInfo(archivo: FileList){
    this.tDocto = archivo;
    
  }

  seleccionar(item:number){
    this.lineaSeleccionada = item;
  }


}
