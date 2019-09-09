export interface Leccion {
  id: string,
  imagen: string; //'../../../../../assets/images/Nueva carpeta/descarga.svg',
  titulo: string; //'JAVASCRIPT ASINCRONO',
  fechaInicio: Date; //'14/01/2018',
  fechaFin: Date; //'31/01/2018',
  descripcion: string; //'Bienvenida al curso, asignación de lugares. Introducción a la computadora y sus componentes.',
  secciones: [];
  contenido: [];
  test: []; // contestar test en linea
  discuciones: []; // discute un tema y gana puntos por contestar
  equipo: []; // agrupar alumnos en equipos y calificar esfuerzo en conjunto
  biblioteca: []; // añadir trabajdo existentes
  encuesta: []; // realiza una encuesta en linea
  archivos: []
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isNil } from 'lodash';
import { ClasesService } from '../clases.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalNuevaLeccionComponent } from '../componentes/modal-nueva-leccion/modal-nueva-leccion.component';
import swal from 'sweetalert';
import { CoreService } from 'src/app/services/service.index';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styles: []
})
export class ClaseComponent implements OnInit {

  private _objeto: any[] = [];
  numeroRegistro: number;
  curso: any;
  private _objetoId: string = this.aRoute.snapshot.paramMap.get('id');
  modalRef: BsModalRef | null;

  public get objetoId(): string {
    return this._objetoId;
  }
  public set objetoId(v: string) {
    this._objetoId = v;
  }
  public get objeto(): any[] {
    return this._objeto;
  }
  public set objeto(v: any[]) {
    this._objeto = v;
  }



  constructor(private router: Router, private aRoute: ActivatedRoute, private srvCurso: ClasesService,
    private modalService: BsModalService, private srvCore: CoreService) {
    if (!isNil(this.objetoId)) {
      this.objInit();
    }

  }

  ngOnInit() { }

  objInit() {
    this.obtenerCursos();
  }

  obtenerCursos() {
    this.srvCore.lock();
    let y = this.srvCurso.getLecciones(this.objetoId).subscribe((lecciones: any) => {
      this.numeroRegistro = lecciones.length
      this.objeto = lecciones
      this.srvCore.unlock();
      y.unsubscribe();
    })
  }

  mostrarLeccion(item: string) {
    this.router.navigate(['/clase/' + this.objetoId + '/leccion/', item]);
  }

  agregarDetalles() {
    const initialState = { objetoId: this.objetoId };
    this.modalRef = this.modalService.show(ModalNuevaLeccionComponent, { class: 'modal-sm', initialState });
    let leccionTemp = this.modalRef.content.leccion.subscribe((leccion: any) => {
      if (leccion.actualizado) {
        swal('Creacion de Lección', 'Se ha creado la lección ' + leccion.leccion.titulo, 'success').then(() => {
          this.obtenerCursos();
          leccionTemp.unsubscribe();
        });
      } else {
        leccionTemp.unsubscribe();
      }
    });
  }
}
