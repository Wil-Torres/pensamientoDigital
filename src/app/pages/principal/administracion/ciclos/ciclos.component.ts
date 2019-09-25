import { Component, OnInit, TemplateRef } from '@angular/core';
import { Ciclo, AdministracionService } from '../administracion.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styles: []
})
export class CiclosComponent implements OnInit {
  cicloEscolar: number = (new Date()).getFullYear();
  modalRef: BsModalRef | null;
  private _objCiclos: Ciclo[] = [];
  public get objCiclos(): Ciclo[] {
    return this._objCiclos;
  }
  public set objCiclos(v: Ciclo[]) {
    this._objCiclos = v;
  }


  constructor(private modalService: BsModalService, private srvAdmin: AdministracionService,
    private router: Router) { }

  ngOnInit() {
    this.srvAdmin.getCiclos().subscribe(ciclos => {
      console.log(ciclos);
      this.objCiclos = ciclos;
    })
  }

  agregar(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });


  }

  agregarCiclo() {
    let nuevoCiclo = {
      ciclo : this.cicloEscolar,
      estado : 'A',
      usuarioId : this.srvAdmin.usuarioInfo.uid,
      fechaCreacion : new Date(),
      id: null
    }
    this.srvAdmin.postCiclo(nuevoCiclo).then(resp => {
      this.modalRef.hide();
      resp.update({ id: resp.id }).then(cicloNew => {
        swal("Ciclo Creado", 'exitosamente', 'success');
      })
    })
  }
  seleccionarCiclo(item: Ciclo){
    this.router.navigate([`ciclos/${item.id}/grados-secciones`])
  }

}
