import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthService } from 'src/app/services/service.index';
import { UserInfo } from 'src/app/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {
  objCollection: AngularFirestoreCollection<any>;
  recursos: Observable<any[]>
  ubicacion: string = 'recursos'
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  arrayDownload: any = [];
  downloadURL: Observable<string>;
  usuario: UserInfo;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private srvUser: AuthService) {
    this.srvUser.userInfo.subscribe(resp => {
      this.usuario = resp
    })
   }

  getAllRecursos() {
    return this.afs.collection('recursos').valueChanges();
  }
  getByIdRecurso(id: string) {
    return this.afs.collection('recursos').doc(id).valueChanges();
  }
  addRecurso(event: FileList) {
    const files = event;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = `${this.ubicacion}/${new Date().getTime()}_${file.name}`;
      const customMetadata = { app: 'Pensamiento_Digital' };
      const fileRef = this.storage.ref(path);
      this.task = this.storage.upload(path, file, { customMetadata })
      this.task.then(tk => {
        let x = this.task.snapshotChanges().pipe(
          finalize(async () => {
            fileRef.getDownloadURL().toPromise().then(url => {
              this.afs.collection('recursos').add({
                id: null,
                nombre: file.name,
                fechaCreacion: new Date(),
                tipoArchivo: file.type,
                url,
                fullPath: tk.ref.fullPath,
                tamanio: file.size,
                seleccionar: false
              }).then((itemRec) => {
                itemRec.update({ id: itemRec.id }).then(() => {
                  x.unsubscribe();
                });
              });
            });
          })
        ).subscribe(resp => { });
      })
    }
  }

  addRecursoCurso(curso: string, leccion: string, tipo: number = 0, event: FileList) {
    return new Promise((resolve) => {
      const files = event;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(this.usuario);
        const path = `cursos/${curso}/${leccion}/${!tipo ? 'contenido' : 'tarea/' + this.usuario.uid}/${new Date().getTime()}_${file.name}`;
        const customMetadata = { app: 'Pensamiento_Digital' };
        const fileRef = this.storage.ref(path);
        this.task = this.storage.upload(path, file, { customMetadata })
        this.task.then(tk => {
          let x = this.task.snapshotChanges().pipe(
            finalize(async () => {
              Promise.all([fileRef.getMetadata().toPromise(), fileRef.getDownloadURL().toPromise()]).then(resp => {
                resolve({fullPath:resp[0].fullPath, url:resp[1]})
              })
              
            })
          ).subscribe(resp => { });
        })
      }

    });

  }

  addGaleria(pathPrincipal: string, event: FileList) {
    return new Promise((resolve) => {
      const files = event;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = `${pathPrincipal}/${new Date().getTime()}_${file.name}`;
        const customMetadata = { app: 'Pensamiento_Digital' };
        const fileRef = this.storage.ref(path);
        this.task = this.storage.upload(path, file, { customMetadata })
        this.task.then(tk => {
          let x = this.task.snapshotChanges().pipe(
            finalize(async () => {
              Promise.all([fileRef.getMetadata().toPromise(), fileRef.getDownloadURL().toPromise()]).then(resp => {
                resolve({fullPath:resp[0].fullPath, url:resp[1]})
              })
              
            })
          ).subscribe(resp => { });
        })
      }

    });

  }

  removeRecurso(item: any) {
    this.afs.collection('recursos').doc(item.id).delete().then(resp => {
      let temp = this.storage.ref(item.fullPath).delete().subscribe(eliminado => {
        temp.unsubscribe();
      })
    })
  }
}
