export interface ListaCursos {
  $key: string;
  cantidadEstudiantes: number;
  grado: string;
  id: String;
  seleccion: boolean;
  clase: String;
  catedra: String;
  lecciones: any;
}
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/service.index';
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
    <button class="btn btn-primary bt-sm float-right" (click)="nuevo()"><i class="fa fa-plus"></i></button>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th class="text-center"></th>
              <th>Clase</th>
              <th>Catedra</th>
              <th>Estudiantes</th>
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
              <td (click)="edicion(item.id)">{{item.clase}}</td>
              <td (click)="edicion(item.id)">{{item.catedra}}<p>{{item.grado}}</p></td>
              <td (click)="edicion(item.id)">{{item.cantidadEstudiantes}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <app-paginacion (paginacion)="buscar($event.offset, $event.limit)" [totalItems]="numeroRegistros"></app-paginacion>
    </div>

Hola
    <div *ngFor="let item of posts">
      <h1>{{item.title}}</h1>
      <p>{{item.contect}}</p>
      <button class="btn btn-danger"  (click)="postServices.deletePost(item.$key)">Delete Post</button>
      <button class="btn btn-primary" *ngIf="postServices.canEdit" (click)="postServices.editPost(item, item)">Edit Post</button>

    </div>
    <div class="row justify-content-md-center">
      <div class="">
        <button class="btn btn-primary" (click)="verArchivo()">view</button>
        <app-file-upload [path]="path" [obj1]="objetos" (obj)="objetos"></app-file-upload>
      </div>
    </div>

  `,
  styles: []
})
export class ListaClasesComponent implements OnInit {

  task: AngularFireUploadTask;
  porcentaje: Observable<number>;
  snapshot: Observable<any>;
  productos: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  arrayDownload: any = [];

  imagenSubir: File;
  imagenTemp: string;

  path = 'imagenes';
  objetos: any = {};
  private _objeto: any[] = [];
  modalRef: BsModalRef | null;
  posts: {};
  public get objeto(): any[] {
    return this._objeto;
  }
  public set objeto(v: any[]) {
    this._objeto = v;
  }


  constructor(private router: Router, private postServices: PostService, private srvCurso: ClasesService,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private modalService: BsModalService,
    @Inject(DOCUMENT) private _document) {
    postServices.getPosts().subscribe(resp => {
      this.posts = resp;

    })
  }

  ngOnInit() {
    this.objInit();
    this.buscar();
  }

  objInit() {
    this.objeto = [
      { id: 1, seleccion: false, clase: 'Javascript With Promises', catedra: 'Programación', grado: '2do', estudiantes: 29 },
      { id: 2, seleccion: false, clase: 'Computación 1do Primaria', catedra: 'Computación', grado: '8do', estudiantes: 14 },
      { id: 3, seleccion: true, clase: 'Computación 2do primaria', catedra: 'Computación', grado: '4do', estudiantes: 15 },
      { id: 4, seleccion: false, clase: 'Computación 3do primaria', catedra: 'Computación', grado: '1do', estudiantes: 12 },
      { id: 5, seleccion: false, clase: 'Computación 4do primaria', catedra: 'Computación', grado: '5do', estudiantes: 17 },
      { id: 6, seleccion: true, clase: 'Computación 4do primaria', catedra: 'Computación', grado: '6do', estudiantes: 20 },
      { id: 7, seleccion: false, clase: 'Computación 6do primaria', catedra: 'Computación', grado: '3do', estudiantes: 19 },
      { id: 8, seleccion: false, clase: 'Computación 1do Basico', catedra: 'Computación', grado: '7do', estudiantes: 20 },
      { id: 9, seleccion: false, clase: 'Computación 3do Basico', catedra: 'Computación', grado: '9do', estudiantes: 15 },
      { id: 10, seleccion: false, clase: 'Computación 4do Bachider', catedra: 'Computación', grado: '10do', estudiantes: 14 },
      { id: 11, seleccion: false, clase: 'Computación 5do Bachider', catedra: 'Computación', grado: 'K', estudiantes: 23 },
      { id: 12, seleccion: false, clase: 'Computación 6do Perito Contador', catedra: 'Computación', grado: '11do', estudiantes: 14 },
      { id: 13, seleccion: false, clase: 'Computación 5do Perito Contador', catedra: 'Computación', grado: '10do', estudiantes: '' }
    ]
  }
  edicion(item: any) {
    this.router.navigate(['/clase/' + item + '/lecciones/']);
  }

  nuevo() {
    this.modalRef = this.modalService.show(ModalNuevaClaseComponent, { class: 'modal-lg' });
    let claseTemp = this.modalRef.content.clase.subscribe((clase: any) => {
      claseTemp.unsubscribe();
    });
  }

  buscar(offset: number = 0, limit: number = 10) {

    this.srvCurso.getCursos(offset, limit).then((resp) => {
      resp.subscribe((res) => {
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
            lecciones: elem.lecciones
          })
        })
        this.objeto = x;
      });
    }).catch(err => {
      console.log(err.FirebaseError);
    })

  }
  verArchivo() {
    const file = this.objetos.img.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      return;
    }
    const path = `imagenes/${new Date().getTime()}_${file.name}`;
    const customMetadata = { app: 'Mi portafolio' };
    const fileRef = this.storage.ref(path);
    this.task = this.storage.upload(path, file, { customMetadata })
    this.task.then(res => {
      fileRef.getDownloadURL().toPromise().then(resp => {
        this.afs.collection('galeria').add(
          {
            path,
            codigo: 1,
            nombre: 'this.objetos.nombre',
            descripcion: 'this.objetos.descripcion',
            precio: 125,
            descuento: 0,
            alto: this.objetos.alto,
            ancho: this.objetos.ancho,
            url: resp
          }
        ).then((galeria: any) => {
          galeria.update({ id: galeria.id }).then(actualizado => {
            this.objetos = {};
            swal('Agregar Galeria', 'Se ha creado la galeria  ' + this.objetos.nombre, 'success').then(() => {
              this.router.navigate(['/lista-galeria']);
            });

          })
        })
      });
    });
    this.porcentaje = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(async () => {
        fileRef.getDownloadURL().toPromise().then(url => {
          this.arrayDownload.push(url);
        });
        return this.downloadURL = fileRef.getDownloadURL()
      })
    );
  }
}
