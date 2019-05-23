import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styles: []
})
export class BibliotecaComponent implements OnInit {
  modalRef: BsModalRef | null;
  private _recursos : any[] = [];
  recursoExistente : any[] = [];
  seleccionaExistente: any;
  public get recursos() : any[] {
    return this._recursos;
  }
  public set recursos(v : any[]) {
    this._recursos = v;
  }
  

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.initObj();
  }

  initObj() {
     this.recursos = [
       {id: 1, seleccionar: false, recurso: 'Documentos Word', enlace: 'no tiene'},
       {id: 2, seleccionar: false, recurso: 'Documentos Excel', enlace: 'no tiene'},
       {id: 3, seleccionar: false, recurso: 'Ejecutable', enlace: 'no tiene'},
       {id: 4, seleccionar: false, recurso: 'Maquetaciones web', enlace: 'no tiene'},
       {id: 5, seleccionar: false, recurso: 'Otros', enlace: 'no tiene'},
     ]

     this.recursoExistente = [
       {id: 6, recurso: 'VS 2013', enlace: 'no tiene'},
       {id: 7, recurso: 'Android Studio', enlace: 'no tiene'},
       {id: 8, recurso: 'VS Code 10.8', enlace: 'no tiene'},
       {id: 9, recurso: 'Node.js', enlace: 'no tiene'},
       {id: 10, recurso: 'Git', enlace: 'no tiene'}
     ]
    
  }

  agregarRecurso(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  eliminarRecurso(){}

}
