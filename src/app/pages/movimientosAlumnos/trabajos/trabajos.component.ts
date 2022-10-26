import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../alumno.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ClasesService } from '../../principal/clases/clases.service';
import { ActivatedRoute } from '@angular/router';
import { isNil } from 'lodash';
import { RecursosService } from '../../principal/recursos/recursos.service';
import swal from 'sweetalert';
import { EntregaTrabajoService } from './entrega-trabajo.service';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styles: []
})
export class TrabajosComponent implements OnInit {
  private _objetoId: string = this.aRoute.snapshot.paramMap.get('id');
  objeto: any = {};
  objBreadcrumb: any = {};
  unidad: number;
  leccion: number;
  contenido: number;
  seleccionado: any;
  seleccionContenido: any;
  vigente: boolean;
  private flTarea: FileList;



  public get objetoId(): string {
    return this._objetoId;
  }
  public set objetoId(v: string) {
    this._objetoId = v;
  } private _forma: FormGroup;

  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }

  constructor(private builder: FormBuilder, private alumno: AlumnoService, private srvCurso: ClasesService,
    private aRoute: ActivatedRoute, private srvRecurso: RecursosService,
    private srvTarea: EntregaTrabajoService) {
    alumno.inicializar();
    this.unidad = 0;
    this.leccion = 0;
    this.contenido = 0;
    this._forma = this.builder.group({
      descripcionTarea: new FormControl(``),
      calificacionTarea: null,
      codigoTarea: null,
      escalaCalificacion: null,
      fechaFinTarea: null,
      fechaInicioTarea: null,
      id: null,
      intervaloMaximo: null,
      leccion: null,
      puntajeMaximo: null,
      tareaCategoria: null,
      tareaTitulo: null,

      tiempoRestante: null,
    })
  }

  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr', 'div']]
    ]
  };

  ngOnInit() {
    //if (!isNil(this.objetoId)) {
    this.obtenerCurso();
    //}
  }
  ngOnDestroy() {
    this.alumno.destruir();
  }

  marcar(raiz: any, marcado: any, obj: any, unidad: any, leccion: any) {
    this.seleccionado = raiz + marcado;
    this.unidad = unidad;
    this.leccion = leccion;
    obj.tiempoRestante = this.calculo((this.objeto.contenido[unidad].test[leccion].fechaFinTarea.toDate()));
    this._forma.patchValue(obj, { emitEvent: false });
  }

  obtenerCurso() {

    let curso = this.srvCurso.getLecciones(this._objetoId).subscribe(resp => {
      let obj = []
      resp.forEach((element, index) => {
        element.visto = false
      })
      resp.forEach((element, index) => {
        obj.push({
          codigoContenido: (index + 1),
          refTarget: '#tema' + index,
          refNombre: 'tema' + index,
          documento: "no hay",
          nombreContenido: element.titulo,
          videoUrlContenido: "",
          subTemas: element.contenido,
          test: element.test
        })
      });
      this.objeto = {
        contenido: obj
      }
      // this.leccionActual();
    })
  }

  calculo(limite: Date) {
    // hora limite - hora actual
    let fechaEntrega = limite
    let fechaActual = new Date();

    let anio = (fechaEntrega).getFullYear() - (fechaActual).getFullYear();
    let mes = (fechaEntrega.getMonth() - (fechaActual).getMonth())
    let dia = (fechaEntrega.getDate() - (fechaActual).getDate())
    let hora = (fechaEntrega.getHours() - (fechaActual).getHours())
    let minuto = (fechaEntrega.getMinutes() - fechaActual.getMinutes())
    if (anio > 0) {
      if ((fechaEntrega.getMonth() > (fechaActual).getMonth())) {
        mes = (fechaEntrega.getMonth() - (fechaActual).getMonth())
      } else {
        mes = ((fechaActual).getMonth() - fechaEntrega.getMonth())
      }
    }
    if (mes > 0) {
      if ((fechaEntrega.getDate() > (fechaActual).getDate())) {
        dia = (fechaEntrega.getDate() - (fechaActual).getDate())
      } else {
        dia = (fechaActual.getDate() - (fechaEntrega).getDate())
      }
    }
    if (dia > 0) {
      if ((fechaEntrega.getHours() > (fechaActual).getHours())) {
        hora = (fechaEntrega.getHours() - (fechaActual).getHours())
      } else {
        hora = (fechaActual.getHours() - (fechaEntrega).getHours())
      }
    }
    if (hora > 0) {
      if ((fechaEntrega.getMinutes() > (fechaActual).getMinutes())) {
        minuto = (fechaEntrega.getMinutes() - fechaActual.getMinutes())
      } else {
        minuto = (fechaActual.getMinutes() - fechaEntrega.getMinutes())
      }
    }

    return this.tiempoRestante(anio, mes, dia, hora, minuto);
  }

  tiempoRestante(anio, mes, dia, hora, minuto): String {
    this.vigente = true;
    if (anio > 0) {
      let x = this.tiempoRestante(0, mes, dia, hora, minuto);
      return `${anio} años ${x}`
    } else if (mes > 0) {
      let x = this.tiempoRestante(0, 0, dia, hora, minuto);
      return `${mes} meses ${x}`
    } else if (dia > 0) {
      let x = this.tiempoRestante(0, 0, 0, hora, minuto);
      return `${dia} dias ${x}`
    } else if (hora > 0) {
      let x = this.tiempoRestante(0, 0, 0, 0, minuto);
      return `${hora} ${hora > 1 ? 'horas' : 'hora'} ${x}`
    } else if (minuto > 0) {
      return `${minuto} ${minuto > 1 ? 'minutos' : 'minuto'}`
    } else {
      this.vigente = false;
      return 'tiempo ha expirado';
    }
  }

  cargarInfo(docto: FileList) {
    this.flTarea = docto;
  }

  adjuntarTarea() {
    this.srvRecurso.addRecursoCurso('EV94TBUKqvfuEjIM4rTM', 'Bihhh126qM8HXJV1saam', 1, this.flTarea).then((resp:any) => {
      this.srvTarea.presentarTarea({
        cursoId: 'EV94TBUKqvfuEjIM4rTM',
        tareaId: 'PDatBCfKSLQ3hAmQimgp'
      }, {
          fechaEntrega: new Date(),
          id: "PDatBCfKSLQ3hAmQimgp",
          numeroIntento: 1,
          puntuacion: null,
          urlTarea: resp.url,
          fullPath: resp.fullPath
        }).then(resp => {
          resp.update({ id: resp.id }).then(re => {
            swal('Operación Exitosa', 'Se ha subido la tarea No. 1', 'success').then(() => { });
          })
        })

    }).catch(() => {
      swal('Operacion Abortada', 'Ha ocurrido un error al cargar la tarea No. 1', 'error').then(() => { });
    }).finally();
  }

  consultar() {
    this.srvTarea.presentarTarea1({
      cursoId: 'JNRSpYOiJEOGjFGrQJdy',
      tareaId: 'PDatBCfKSLQ3hAmQimgp'
    }, {
        fechaEntrega: 'Timestamp {seconds: 1566972000, nanoseconds: 0}',
        id: "PDatBCfKSLQ3hAmQimgp",
        numeroIntento: 1,
        puntuacion: "5",
        urlTarea: "https://firebasestorage.googleapis.com/v0/b/prueba-1df69.appspot.com/o/cursos%2FJNRSpYOiJEOGjFGrQJdy%2FPDatBCfKSLQ3hAmQimgp%2Ftarea%2F9KprCpB7DoRHtorFuKfRpNKH6Cn1%2F1566596459899_Factura%20Cambiaria%20FC228.pdf?alt=media&token=d579f037-f8e8-4144-8b86-f647f425f72d",
      }).subscribe(resp => {
      });
  }

}

