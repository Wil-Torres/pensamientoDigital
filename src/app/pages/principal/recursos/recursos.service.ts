import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {
  objCollection: AngularFirestoreCollection<any>;
  recursos: Observable<any[]>
  ubicacion: string
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  arrayDownload: any = [];
  downloadURL: Observable<string>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}

  getAllRecursos(){
    return this.afs.collection('recursos').valueChanges();
  }

  getByIdRecurso(id:string){
    return this.afs.collection('recursos').doc(id).valueChanges();
  }
  addRecurso(event: FileList){
    const files = event;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type :( ');
        return;
      }
      const path = `${this.ubicacion}/${new Date().getTime()}_${file.name}`;
      const customMetadata = { app: 'Pensamiento_Digital' };
      const fileRef = this.storage.ref(path);
      this.task = this.storage.upload(path, file, { customMetadata })
      this.task.then(res => {
        this.snapshot = this.task.snapshotChanges().pipe(
          finalize(async () => {
            fileRef.getDownloadURL().toPromise().then(url => {
              /*this.arrayDownload.push(url);
              this.producto.imagenes = this.arrayDownload;
              this.producto.img = event;
              this.obj.emit(this.producto);*/
            });
            return this.downloadURL = fileRef.getDownloadURL()
          })
        );
      });

    }
    
  }



}
