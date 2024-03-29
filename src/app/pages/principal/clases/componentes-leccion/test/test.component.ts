import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TareasComponent } from '../tareas/tareas.component';
import { FormGroup } from '@angular/forms';
import { isNil } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: []
})
export class TestComponent implements OnInit {
  modalRef: BsModalRef | null;
  seleccion: any;
  private _forma : FormGroup;

  public get forma() : FormGroup {
    return this._forma;
  }
  @Input() public set forma(v : FormGroup) {
    this._forma = v;
  }
  
  constructor(private modalService: BsModalService, private arouter: ActivatedRoute) { }

  ngOnInit() {
    this.objInit()
  }

  objInit() {}
  agregarTarea() {
    const opciones = {
      initialState: {
        leccion:this.arouter.snapshot.paramMap.get('id')
      },
      class: 'modal-lg',
      ignoreBackdropClick: true,
    }
    this.modalRef = this.modalService.show(TareasComponent, opciones);
    let tareaTemp = this.modalRef.content.tarea.subscribe((tarea: any) => {
      this.forma.value.test.push(tarea.tarea)
      tareaTemp.unsubscribe();
    })
  }

  editarTarea(indice:number = 0) {
    if (this.seleccion) {
      const opciones = {
        initialState: {
          edicion: this.seleccion
        },
        class: 'modal-lg',
        ignoreBackdropClick: true,
      };
      this.modalRef = this.modalService.show(TareasComponent, opciones);
      let tareaTemp = this.modalRef.content.tarea.subscribe((tarea: any) => {
        let edicion = this.forma.value.test;
        let x = edicion.findIndex((elem: any) => {
          return elem.id === tarea.tarea.id;
        })
        if (!isNil(x)){
          edicion[x] = tarea.tarea;
        }
        this.forma.patchValue({test: edicion});
        tareaTemp.unsubscribe();
      })
    } else {
      return
    }
  }

  borrarTarea() {
    if (this.seleccion) {
      let x = this.forma.value.test.find(elem => {
        return elem.tareaTitulo === this.seleccion.tareaTitulo
      })
      if (x) {
        this.forma.value.test.splice(x, 1)
      }
    } else {
      return
    }
  }

  deshacerSeleccion() {
    this.seleccion = null
  }



}
