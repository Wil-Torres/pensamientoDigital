import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input('path') public ubicacion:string='';
  @Input('obj1') public producto:any={}
  @Output('obj') obj: EventEmitter<any> = new EventEmitter();
  @ViewChild('logo') logo: ElementRef;

  task: AngularFireUploadTask;
  porcentaje: Observable<number>;
  snapshot: Observable<any>;
  productos: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  arrayDownload: any = [];

  imagenSubir: File;
  imagenTemp: string;

  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.arrayDownload = this.producto.imagenes || [];
  }

  toggleHover(event: boolean) {
    this.isHovering = event
  }
  startUpload(event: FileList) {
    // const file = event.item(0);
    const files = event;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type :( ');
        return;
      }
      const path = `${this.ubicacion}/${new Date().getTime()}_${file.name}`;
      const customMetadata = { app: 'My AngularFire-powered PWA!' };
      const fileRef = this.storage.ref(path);
      this.task = this.storage.upload(path, file, { customMetadata })
      this.task.then(res => {
        this.porcentaje = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges().pipe(
          finalize(async () => {
            fileRef.getDownloadURL().toPromise().then(url => {
              this.arrayDownload.push(url);
              this.producto.imagenes = this.arrayDownload;
              this.producto.img = event;
              this.obj.emit(this.producto);
            });
            return this.downloadURL = fileRef.getDownloadURL()
          })
        );
      });

    }

  }

  seleccionImagen( archivo: File ) {
    if (!archivo){
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0){
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {this.imagenTemp = reader.result.toString()};
    this.producto.img = event;
  }

  onLoad() {
    console.log('lectura de imagen');
    this.producto.ancho = (this.logo.nativeElement as HTMLImageElement).naturalWidth;
    this.producto.alto = (this.logo.nativeElement as HTMLImageElement).naturalHeight;
    this.obj.emit(this.producto);
  }

  isActive(snapshot) {
    return snapshot === 'running' && snapshot.bytesTansferred < snapshot.totalBytes;
  }

}
