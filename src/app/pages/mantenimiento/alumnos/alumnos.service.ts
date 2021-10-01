import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Alumno } from 'src/app/interfaces/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumno: Observable<Alumno[]>
  coleccionAlumno: AngularFirestoreCollection<Alumno>;
  next: AngularFirestoreCollection<Alumno>;

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
  getPaginacionCursos() {
    this.afs.collection('alumnos').valueChanges().subscribe(resp => {
      this._paginacion = {
        resp,
        totalRegistros: resp.length
      }
    });
  }
  /* *******************************************************************
  **********************RECURSO DE CURSOS ******************************
  *********************************************************************/
  getAlumnos(offset: any, limit: any) {
    this.coleccionAlumno = this.afs.collection('alumnos')
    return this.coleccionAlumno.get().toPromise().then((snapshot) => {
      var last = snapshot.docs[offset];
      // Construct a new query starting at this document.
      // Note: this will not have the desired effect if multiple
      // marcas have the exact same population value.
      if (offset) {
        var next = this.afs.collection('alumnos', ref => ref.startAfter(last).limit(limit))
      } else {
        var next = this.afs.collection('alumnos', ref => ref.limit(limit));
      }
      // Use the query for pagination
      // [START_EXCLUDE]
      return next.valueChanges();
      // [END_EXCLUDE]
    });
    // [END cursor_paginate]
  }

  getAlumno(id: string) {
    this.coleccionAlumno = this.afs.collection<any>('alumnos');
    let x = this.coleccionAlumno.snapshotChanges();
    x.forEach(producto => {
      producto.forEach(prod => {
        let data = prod.payload.doc.data();
        let id = prod.payload.doc.id;
        data['id'] = id;
      });
    })
    return this.coleccionAlumno.doc(id).valueChanges();

  }
  addAlumno(obj: Alumno) {
    return this.afs.collection('alumnos').add(obj);
  }
  removeAlumno(obj: Alumno) {
    return this.afs.collection('alumnos').doc(obj.id).delete()
  }
  updateAlumno(clase: Alumno) {
    return this.afs.collection('alumnos').doc(clase.id).update(clase)
  }
}
