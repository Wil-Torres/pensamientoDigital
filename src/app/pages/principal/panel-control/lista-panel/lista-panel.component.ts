import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { BusquedaModalComponent } from 'src/app/shared/componentes/busqueda-modal/busqueda-modal.component';
import { FiltroBusqueda } from 'src/app/shared/componentes/interfaces/comun';

@Component({
    selector: 'app-lista-panel',
    templateUrl: './lista.html',
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
            'leyenda': 'Genero de Alumnos'
        },
        'grafico3': {
            'labels': ['Reforzar', 'Bien', 'Excelente'],
            'data': [5, 5, 90],
            'type': 'doughnut',
            'leyenda': 'Promedio de Alumnos'
        },
        'grafico4': {
            'labels': ['No', 'Si'],
            'data': [15, 85],
            'type': 'doughnut',
            'leyenda': 'Tareas Entregadas'
        }
    };
    private _modalRef: BsModalRef;
    private _objeto: any = {};
    private _filtroId = 'id';
    private _claseModal: string;
    private _filtroDesc = 'descripcion';
    private _filtroLista = 'lista';
    private _tituloModal: string;
    private _modelo: string;
    private _campoListaId = '';
    private _campos: any[] = [
        {
            clase: 'text-center',
            titulo: 'Codigo',
            nombre: 'id'
        },
        {
            clase: '',
            titulo: 'Descripción',
            nombre: 'nombreCompleto'
        }];
    private _campoDescripcion: any[] = [
        { id: 'id', descripcion: 'descripcion' }];
    private _bloqueado = false;
    private _incluye = true;
    private _recurso: any;
    private _seleccionados = [];
    private _filtros: FiltroBusqueda[];
    private _tipoVario: boolean;
    constructor(private spinner: NgxSpinnerService, private modalService: BsModalService) { }

    ngOnInit() {
        this.spinner.show();

        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
        }, 5000);
    }

    mostrar() {
        const estado = {
            initialState: {
                titulo: 'titulo de Modal'
            },
            class: "modal-lg"
        };
        this._modalRef = this.modalService.show(BusquedaModalComponent, estado);
        this._modalRef.content.recurso = this._recurso;
        this._modalRef.content.tipoVario = this._tipoVario;
        this._modalRef.content.campos = this._campos;
        this._modalRef.content.campoDescripcion = this._campoDescripcion;
        this._modalRef.content.filtros = this._filtros;
        this._modalRef.content.buscar();

    }




}