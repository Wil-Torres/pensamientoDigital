export interface Clase {
  id: string;
  $key: string;
  cantidadEstudiantes: number;
  grado: string;
  clase: String;
  catedra: String;
  detalle_Lecciones: [];
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  clases: Observable<Clase[]>
  coleccionClases: AngularFirestoreCollection<Clase>;
  coleccionNotifiaciones: AngularFirestoreCollection<any>;
  next: AngularFirestoreCollection<Clase>;

  private _paginacion: any = {};
  public get paginacion(): any {
    return this._paginacion;
  }
  public set paginacion(v: any) {
    this._paginacion = v;
  }


  constructor(private afs: AngularFirestore) {
    this.getPaginacionCursos()
  }

  generateKey() {
    return this.afs.createId();
  }


  getPaginacionCursos() {
    this.afs.collection('cursos').valueChanges().subscribe(resp => {
      this._paginacion = {
        resp,
        totalRegistros: resp.length
      }
    });
  }
  /* *******************************************************************
  **********************RESOURCE CURSOS ********************************
  *********************************************************************/
  getCursos(offset: any, limit: any) {
    this.coleccionClases = this.afs.collection('cursos')
    return this.coleccionClases.get().toPromise().then((snapshot) => {
      var last = snapshot.docs[offset];
      // Construct a new query starting at this document.
      // Note: this will not have the desired effect if multiple
      // marcas have the exact same population value.
      if (offset) {
        var next = this.afs.collection('cursos', ref => ref.startAfter(last).limit(limit))
      } else {
        var next = this.afs.collection('cursos', ref => ref.limit(limit));
      }
      // Use the query for pagination
      // [START_EXCLUDE]
      return next.valueChanges();
      // [END_EXCLUDE]
    });
    // [END cursor_paginate]
  }

  getCurso(id: string) {
    this.coleccionClases = this.afs.collection<any>('cursos');
    let x = this.coleccionClases.snapshotChanges();
    x.forEach(producto => {
      producto.forEach(prod => {
        let data = prod.payload.doc.data();
        let id = prod.payload.doc.id;
        data['id'] = id;
      });
    })
    return this.coleccionClases.doc(id).valueChanges();

  }
  addCursos(obj: Clase) {
    return this.afs.collection('cursos').add(obj);
  }
  removeCursos(obj: Clase) {
    return this.afs.collection('cursos').doc(obj.id).delete()
  }
  updateCursos(clase: Clase) {
    return this.afs.collection('cursos').doc(clase.id).update(clase)
  }

  /* *******************************************************************
  **************** RESOURCE LECCIONES OF CURSO *************************
  *********************************************************************/
  getLecciones(curso: string) {
    return this.afs.collection<any>('cursos').doc(curso).collection('lecciones').valueChanges();
  }
  getLeccion(curso: string, leccion: string) {
    return this.afs.collection<any>('cursos').doc(curso).collection('lecciones').doc(leccion).valueChanges();
  }
  addLeccion(id: string, obj: any) {
    return this.afs.collection('cursos').doc(id).collection('lecciones').add(obj);
  }
  updateLeccion(id: string, obj: any) {
    return this.afs.collection('cursos').doc(id).collection('lecciones').doc(obj.id).update(obj);
  }
  removeLecciones(id: string, obj: any) {
    return this.afs.collection('cursos').doc(id).collection('lecciones').doc(obj.id).delete();
  }

  /* *******************************************************************
  ************** RESOURCE CONTENIDOS OF LECCIONES **********************
  *********************************************************************/


  /* *******************************************************************
  **************** RESOURCE TAREAS OF LECCIONES ************************
  *********************************************************************/

  /* *******************************************************************
  ************* RESOURCE DISCUCIONES OF LECCIONES **********************
  *********************************************************************/
  getDiscuciones(curso: string, leccion: string) {
    return this.afs.collection<any>('cursos').doc(curso).collection('lecciones').doc(leccion).collection('discuciones').valueChanges();
  }
  getDiscucion(curso: string, leccion: string, discucion: string) {
    return this.afs.collection<any>('cursos').doc(curso).collection('lecciones').doc(leccion).collection('discuciones').doc(discucion).valueChanges();
  }
  addDiscucion(id: string, leccion: string, obj: any) {
    return this.afs.collection('cursos').doc(id).collection('lecciones').doc(leccion).collection('discuciones').add(obj);
  }
  updateDiscucion(id: string, leccion: string, obj: any) {
    return this.afs.collection('cursos').doc(id).collection('lecciones').doc(leccion).collection('discuciones').doc(obj.id).update(obj);
  }
  removeDiscucion(id: string, leccion: string, obj: any) {
    return this.afs.collection('cursos').doc(id).collection('lecciones').doc(leccion).collection('discuciones').doc(obj.id).delete();
  }

  /* *******************************************************************
  ************* RESOURCE POSTS OF DISCUCIONES OF LECCIONES *************
  *********************************************************************/
  getPosts(curso: string, leccion: string, discucion: string) {
    return this.afs
      .collection<any>('cursos').doc(curso)
      .collection('lecciones').doc(leccion)
      .collection('discuciones').doc(discucion)
      .collection('posts').valueChanges();
  }
  getPost(curso: string, leccion: string, discucion: string, post: string) {
    return this.afs
      .collection<any>('cursos').doc(curso)
      .collection('lecciones').doc(leccion)
      .collection('discuciones').doc(discucion)
      .collection('posts').doc(post).valueChanges();
  }
  addPosts(id: string, leccion: string, discucion: string, obj: any) {
    return this.afs
      .collection('cursos').doc(id)
      .collection('lecciones').doc(leccion)
      .collection('discuciones').doc(discucion)
      .collection('posts').add(obj);
  }
  updatePosts(id: string, leccion: string, discucion: string, obj: any) {
    return this.afs
      .collection('cursos').doc(id)
      .collection('lecciones').doc(leccion)
      .collection('discuciones').doc(discucion)
      .collection('posts').doc(obj.id)
      .update(obj);
  }
  removePosts(id: string, leccion: string, discucion: string, obj: any) {
    return this.afs
      .collection('cursos').doc(id)
      .collection('lecciones').doc(leccion)
      .collection('discuciones').doc(discucion)
      .collection('posts').doc(obj.id)
      .delete();
  }

  sendNotification(candidatos: any = [{id:'9KprCpB7DoRHtorFuKfRpNKH6Cn1'}], obj:any): Promise<void> {
    this.coleccionClases = this.afs.collection<any>('users');
    return this.coleccionClases.ref.get().then(resp => {
      let batch = this.afs.firestore.batch();
      resp.docs.forEach(userDocRef => {
        candidatos.forEach(element => {
          if(element.id === userDocRef.id){
            userDocRef.ref.collection('notificaciones').add(obj);
          }
        });
        //batch.update(userDocRef.ref, {'score':0, 'leadsWithSalesWin': 0, 'leadsReported': 0})
      });
      batch.commit().catch(err => {console.log(err)})
    }).catch( error => swal('Ocurrio un problema', error, 'error'));

  }


}
