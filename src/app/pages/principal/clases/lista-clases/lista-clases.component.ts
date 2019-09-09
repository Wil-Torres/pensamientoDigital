export interface ListaCursos {
  $key: string;
  cantidadEstudiantes: number;
  grado: string;
  id: String;
  seleccion: boolean;
  clase: String;
  catedra: String;
  lecciones: any;
  url:string;
}
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostService, CoreService } from 'src/app/services/service.index';
import { ClasesService } from '../clases.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DOCUMENT } from '@angular/platform-browser';
import swal from 'sweetalert';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalNuevaClaseComponent } from '../componentes/modal-nueva-clase/modal-nueva-clase.component';

@Component({
  selector: 'app-lista-clases',
  template: `

    <div class="col-md-12 col-sm-12 col-xs-12">
      <button class="btn btn-success bt-sm float-right" (click)="consultar()"><i class="fa fa-check"></i></button>
      <button class="btn btn-primary bt-sm float-right" (click)="nuevo()"><i class="fa fa-plus"></i></button>
      <div *ngIf="!numeroRegistro" class="d-flex justify-content-center">
        <h1>No hay datos <i class="fa fa-database text-danger"></i></h1>
      </div>
      <div class="table-responsive" *ngIf="numeroRegistro">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th class="gt-wd-75 text-center"></th>
              <th class="gt-wd-75 text-center"><i class="fa fa-picture-o"></i></th>
              <th>Clase</th>
              <th class="gt-wd-200">Catedra</th>
              <th class="gt-wd-100">Estudiantes</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of objeto">
              <td class="text-center">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" [name]="item.id" [id]="item.id" [(ngModel)]="item.seleccion">
                  <label class="form-check-label" [for]="item.id"></label>
                </div>
              </td>
              <td><img [src]="item.url" alt="" class="img-thumbnail"></td>
              <td (click)="edicion(item.id)">{{item.clase}}</td>
              <td (click)="edicion(item.id)">{{item.catedra}}<p>{{item.grado}}</p></td>
              <td (click)="edicion(item.id)">{{item.cantidadEstudiantes}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <app-paginacion (paginacion)="buscar($event.offset, $event.limit)" [totalItems]="numeroRegistros"></app-paginacion>
    </div>
  `,
  styles: [`
  .img-thumbnail{
    width: 70px !important;
    height: 50px !important;
  }
  `]
})
export class ListaClasesComponent implements OnInit {
  private _objeto: any[] = [];
  modalRef: BsModalRef | null;
  numeroRegistro: number;
  public get objeto(): any[] {
    return this._objeto;
  }
  public set objeto(v: any[]) {
    this._objeto = v;
  }

  constructor(private router: Router, private srvCurso: ClasesService,
    private modalService: BsModalService, private srvCore: CoreService) { }

  ngOnInit () {
    this.objInit();
  }

  objInit () {
    this.buscar();
  }

  edicion (item: any) {
    this.router.navigate(['/clase/' + item + '/lecciones/']);
  }

  nuevo() {
    this.modalRef = this.modalService.show(ModalNuevaClaseComponent, { class: 'modal-lg' });
    let claseTemp = this.modalRef.content.clase.subscribe((clase: any) => {
      claseTemp.unsubscribe();
    });
  };

  consultar(){
    this.buscar();
  }

  buscar (offset: number = 0, limit: number = 10) {
    this.srvCore.lock()
    this.srvCurso.getCursos(offset, limit).then((resp) => {
      resp.subscribe((res) => {
        this.numeroRegistro = res.length
        let x = [];
        res.forEach((elem: ListaCursos) => {
          x.push({
            $key: elem.$key,
            cantidadEstudiantes: elem.cantidadEstudiantes,
            grado: elem.grado,
            id: elem.$key,
            seleccion: false,
            clase: elem.clase,
            catedra: elem.catedra,
            lecciones: elem.lecciones,
            url: elem.url
          })
        })
        this.objeto = x;
        this.srvCore.unlock();
      });
    }).catch(err => {
      swal('Ocurrio un inconveniente',err.FirebaseError,'error')
      this.srvCore.unlock();
    })
  };
}
