import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Profesor } from 'src/app/interfaces/profesor';



@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  profesor: Observable<Profesor[]>
  coleccionProfesor: AngularFirestoreCollection<Profesor>;
  next: AngularFirestoreCollection<Profesor>;

  private _paginacion: any = {};
  public get paginacion(): any {
    return this._paginacion;
  }
  public set paginacion(v: any) {
    this._paginacion = v;
  }


  constructor(private afs: AngularFirestore) {
    this.getPaginacionProfesores()
  }
  getPaginacionProfesores() {
    this.afs.collection('profesores').valueChanges().subscribe(resp => {
      this._paginacion = {
        resp,
        totalRegistros: resp.length
      }
    });
  }
  /* *******************************************************************
  **********************RESOURCE CURSOS ********************************
  *********************************************************************/
  getProfesores(offset: any, limit: any) {
    this.coleccionProfesor = this.afs.collection('profesores')
    return this.coleccionProfesor.get().toPromise().then((snapshot) => {
      var last = snapshot.docs[offset];
      // Construct a new query starting at this document.
      // Note: this will not have the desired effect if multiple
      // marcas have the exact same population value.
      if (offset) {
        var next = this.afs.collection('profesores', ref => ref.startAfter(last).limit(limit))
      } else {
        var next = this.afs.collection('profesores', ref => ref.limit(limit));
      }
      // Use the query for pagination
      // [START_EXCLUDE]
      return next.valueChanges();
      // [END_EXCLUDE]
    });
    // [END cursor_paginate]
  }

  getProfesor(id: string) {
    this.coleccionProfesor = this.afs.collection<any>('profesores');
    let x = this.coleccionProfesor.snapshotChanges();
    x.forEach(producto => {
      producto.forEach(prod => {
        let data = prod.payload.doc.data();
        let id = prod.payload.doc.id;
        data['id'] = id;
      });
    })
    return this.coleccionProfesor.doc(id).valueChanges();

  }
  addProfesor(obj: Profesor) {
    return this.afs.collection('profesores').add(obj);
  }
  removeProfesor(obj: Profesor) {
    return this.afs.collection('profesores').doc(obj.id).delete()
  }
  updateProfesor(obj: Profesor) {
    return this.afs.collection('profesores').doc(obj.id).update(obj)
  }
}
