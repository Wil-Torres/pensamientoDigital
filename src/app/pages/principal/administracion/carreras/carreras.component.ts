import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Ciclo,  Carrera, AdministracionService } from '../administracion.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styles: []
})
export class CarrerasComponent implements OnInit {
  modalRef: BsModalRef | null;
  private _objCarrera: Carrera[] = [];
  carreraEscolar: any = {};
  public get objCarrera(): Carrera[] {
    return this._objCarrera;
  }
  public set objCarrera(v: Carrera[]) {
    this._objCarrera = v;
  }


  constructor(private modalService: BsModalService, private srvAdmin: AdministracionService,
    private router: Router) { }

  ngOnInit() {
    this.srvAdmin.getCarreras().subscribe(carrera => {
      console.log(carrera);
      this.objCarrera = carrera;
    })
  }

  agregar(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });


  }

  agregarCarrera() {
    let nuevaCarrera = {
      descripcion : this.carreraEscolar.descripcion,
      codigo: this.carreraEscolar.codigo,
      estado : 'A',
      usuarioId : this.srvAdmin.usuarioInfo.uid,
      fechaCreacion : new Date(),
      id: null
    }
    this.srvAdmin.postCarrera(nuevaCarrera).then(resp => {
      this.carreraEscolar = {};
      this.modalRef.hide();
      resp.update({ id: resp.id }).then(carreraNew => {
        swal("Carrera Creada", 'exitosamente', 'success');
      })
    })
  }
  
}
