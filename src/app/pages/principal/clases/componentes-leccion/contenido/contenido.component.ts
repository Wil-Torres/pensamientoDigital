import { Component, OnInit, Input } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { FormGroup } from '@angular/forms';
import { RecursosService } from '../../../recursos/recursos.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalDetalleSubtemaComponent } from './modal-detalle-subtema.component';
import swal from 'sweetalert';
import { isNil } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styles: []
})
export class ContenidoComponent implements OnInit {
  detalle: any = {};
  temContenido: [];
  lineaSeleccionada: number;
  private modalRef: BsModalRef;
  private _forma: FormGroup;
  public get forma(): FormGroup {
    return this._forma;
  }
  @Input() public set forma(v: FormGroup) {
    this._forma = v;
  }
  private _cursoId: any = this.router.snapshot.paramMap.get('curso');
  private _leccionId: any = this.router.snapshot.paramMap.get('id');
  constructor(private srvRecurso: RecursosService, private modalService: BsModalService, public router: ActivatedRoute) { }

  ngOnInit() { }

  objInit() { }
  cancelar() {
    this.detalle = {};
  }
  agregarDetalle() {
    console.log('detalle');
    let valida = this.validarDetalle();
    if (valida.error) {
      swal('Verificar Información', valida.mensaje, 'error');
      return;
    }

    this.detalle.detalle = [];
    this.forma.value.contenido.push(this.detalle)
    this.cancelar();

  }
  validarDetalle() {
    let respuesta = { error: false, mensaje: '' }
    if (isNil(this.detalle.codigoSubTema)) {
      return { error: true, mensaje: 'Falta ingresar código de contenido' }
    }
    if (isNil(this.detalle.descripcion)) {
      return { error: true, mensaje: 'Falta ingresar descripción de contenido' }
    }
    return respuesta;

  }

  seleccionar(item: number) {
    this.lineaSeleccionada = item;
  }

  mostrarContenido(item: any, i: number) {
    this.temContenido = item.detalle;
    this.seleccionar(i)
  }

  addDetalleContenido(id: number) {
    const opciones = {
      initialState: {
        leccionId: this._leccionId,
        cursoId: this._cursoId,
      },
      class: 'modal-lg'
    };


    this.modalRef = this.modalService.show(ModalDetalleSubtemaComponent, opciones);
    let contenidoTemp = this.modalRef.content.addContenido.subscribe((content: any) => {
      this.forma.value.contenido[id].detalle.push(content)
      contenidoTemp.unsubscribe();
    })
  }
  textoTipoContenido(item: any) {
    let texto = '';
    switch (item) {
      case '0':
        texto = 'Video'
        break;
      case '1':
        texto = 'Docto.'
        break;
      case '2':
        texto = 'Link'
        break;
      case '3':
        texto = 'Imagen'
        break;
    }
    return texto;
  }

  eliminarDetalleContenido(item: any, linea: number) {

    this.srvRecurso.removeRecursoCurso(this._cursoId, this._leccionId, 0, item.path).then(() => {
      this._forma.value.contenido[this.lineaSeleccionada].detalle.splice(linea, 1);
    }).catch(err => {
      console.log(err);
    });

  }

}
