import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TareasComponent } from '../tareas/tareas.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: []
})
export class TestComponent implements OnInit {
  modalRef: BsModalRef | null;
  seleccion: any;
  private _trabajos: any[] = [];
  public get trabajos(): any[] {
    return this._trabajos;
  }
  public set trabajos(v: any[]) {
    this._trabajos = v;
  }


  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.objInit()
  }

  objInit() {
    this.trabajos = [
      {
        trabajoId: 1, tareaTitulo: 'Quiz de 5 y 6 unidad', fechaInicioTarea: '20/05/2019', seleccionar: true,
        fechaFinTarea: '21/05/2019', asignado: true, puntajeMaximo: 100, intervaloMaximo: 8.3, calificacionTarea: 27
      },
      {
        trabajoId: 2, tareaTitulo: 'Parcial 2da Unidad', fechaInicioTarea: '20/05/2019', seleccionar: false,
        fechaFinTarea: '27/05/2019', asignado: true, puntajeMaximo: 100, intervaloMaximo: 8.3, calificacionTarea: 27
      },
      {
        trabajoId: 3, tareaTitulo: 'Presentacion de Trabajo', fechaInicioTarea: '22/05/2019', seleccionar: true,
        fechaFinTarea: '21/05/2019', asignado: false, puntajeMaximo: 100, intervaloMaximo: 8.3, calificacionTarea: 27
      },
    ]
  }
  agregarTarea() {
    this.modalRef = this.modalService.show(TareasComponent, { class: 'modal-lg' });
    let tareaTemp = this.modalRef.content.tarea.subscribe((tarea: any) => {
      console.log(tarea)
      this.trabajos.push(tarea.tarea)
      tareaTemp.unsubscribe();
    })
  }

  editarTarea() {
    if (this.seleccion) {
      const opciones = {
        initialState: {
          edicion: this.seleccion
        },
        class: 'modal-lg'
      };
      this.modalRef = this.modalService.show(TareasComponent, opciones);
      let tareaTemp = this.modalRef.content.tarea.subscribe((tarea: any) => {
        console.log(tarea)
        this.trabajos.push(tarea.tarea)
        tareaTemp.unsubscribe();
      })
    } else {
      return
    }
  }

  borrarTarea() {
    if (this.seleccion) {
      let x = this.trabajos.find(elem => {
        return elem.tareaTitulo === this.seleccion.tareaTitulo
      })
      if (x) {
        this._trabajos.splice(x, 1)
      }
    } else {
      return
    }
  }

  deshacerSeleccion() {
    this.seleccion = null
  }



}
