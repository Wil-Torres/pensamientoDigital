import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encabezado-pagina',
  templateUrl: './encabezado-pagina.component.html',
  styleUrls: ['./encabezado-pagina.component.css']
})
export class EncabezadoPaginaComponent implements OnInit {

  titulos: any = {};
  @Input('optNew') public etiquetaNuevo:string= '';
  

  constructor(public router: Router) { }

  ngOnInit() {
    this.titulos.tituloLista = 'Listado de Marcas';
    this.titulos.subtituloLista = 'Lista todas las marcas asociadas a un producto determinado';
  }
  nuevo() {
    this.router.navigate([`/${this.etiquetaNuevo}`])
  }

  guardar() {
    alert('guardar nuevo o edicion')
  }

  editar() {
    alert('editando registro')
  }

  borrar() {
    alert('borrando registro')
  }
  ejecutarReporte(){}


}
