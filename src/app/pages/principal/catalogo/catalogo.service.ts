import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { RecursosService } from '../recursos/recursos.service';
import { Observable, ObjectUnsubscribedError } from 'rxjs';
import { UserInfo } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/service.index';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  data: any[];
  cursos: Observable<any[]>
  coleccionCursos: AngularFirestoreCollection<any>;
  next: AngularFirestoreCollection<any>;
  infoUsuario: UserInfo

  constructor(private afs: AngularFirestore, private srvRecurso: RecursosService, private srvAuth: AuthService) {

    this.srvAuth.userInfo.subscribe(resp => {
      this.infoUsuario = resp;
    })
    this.obtenerCategorias().then(resp => {
      console.log(resp);
    })
    /*this.data = [{
      descripcion: "Architecture",
      detalle: [
        { descripcion: "Architectural Studies" },
        { descripcion: "Exterior Architecture" },
        { descripcion: "Interior Architecture" }]
    },
    {
      descripcion: "Art",
      detalle: [
        { descripcion: "3D Animation" },
        { descripcion: "Art and Design" },
        { descripcion: "Dance" },
        { descripcion: "Fashion Design" },
        { descripcion: "Fine Arts" },
        { descripcion: "Music" },
        { descripcion: "Theater" },
        { descripcion: "Visual Arts" }]
    },
    {
      descripcion: "Business",
      detalle: [
        { descripcion: "Accounting" },
        { descripcion: "Agribusiness" },
        { descripcion: "Entrepreneurship" },
        { descripcion: "Finance" },
        { descripcion: "Marketing" }]
    },
    { descripcion: "Career Technical Education" },
    { descripcion: "Communication Studies" },
    {
      descripcion: "Computers",
      detalle: [
        { descripcion: "Computer Hardware" },
        { descripcion: "Programming" },
        { descripcion: "Software Applications" }]
    },
    { descripcion: "Criminology" },
    { descripcion: "Driver Education" },
    { descripcion: "Earth" },
    {
      descripcion: "Economics",
      detalle: [
        { descripcion: "Family and Consumer Science" }]
    },
    {
      descripcion: "Education",
      detalle: [
        { descripcion: "Special Education" }]
    },
    {
      descripcion: "Engineering",
      detalle: [
        { descripcion: "Chemical Engineering" },
        { descripcion: "Civil Engineering" },
        { descripcion: "Electrical Engineering" },
        { descripcion: "Electronic Engineering" },
        { descripcion: "Mechanical Engineering" },
        { descripcion: "Petroleum Engineering" }]
    },
    {
      descripcion: "English / Language Arts",
      detalle: [
        { descripcion: "Literature" },
        { descripcion: "Mythology and Folklore" }]
    },
    {
      descripcion: "Foreign Language",
      detalle: [
        { descripcion: "Arabic" },
        { descripcion: "Chinese" },
        { descripcion: "English (ESL" },
        { descripcion: "French" },
        { descripcion: "German" },
        { descripcion: "Greek" },
        { descripcion: "Hebrew" },
        { descripcion: "Italian" },
        { descripcion: "Japanese" },
        { descripcion: "Latin" },
        { descripcion: "Portuguese" },
        { descripcion: "Russian" },
        { descripcion: "Spanish" },
        { descripcion: "Ukrainian" }]
    },
    {
      descripcion: "Health Fitness",
      detalle: [
        { descripcion: "Health" },
        { descripcion: "Medicine" },
        { descripcion: "Nutrition" },
        { descripcion: "Physical Education" },
        { descripcion: "Athletics" },
        { descripcion: "Gymnastics" },
        { descripcion: "Pilates" }]
    },
    { descripcion: "History" },
    {
      descripcion: "Hospitality and Tourism",
      detalle: [
        { descripcion: "Culinary Arts" },
        { descripcion: "Hotel Management" },
        { descripcion: "Tourism Management" }]
    },
    { descripcion: "Information Literacy" },
    { descripcion: "Law" },
    { descripcion: "Logistics Management" },
    { descripcion: "Math" },
    { descripcion: "Meteorology" },
    { descripcion: "Nursing" },
    { descripcion: "Other" },
    { descripcion: "Philosophy" },
    { descripcion: "Politics" },
    { descripcion: "Professional Development" },
    {
      descripcion: "Psychology",
      detalle: [
        { descripcion: "Counseling" },
        { descripcion: "Sociology" }]
    },
    {
      descripcion: "Religion",
      detalle: [
        { descripcion: "Bible" },
        { descripcion: "Islam" },
        { descripcion: "Ministry" },
        { descripcion: "Theology" }]
    },
    {
      descripcion: "Science",
      detalle: [
        { descripcion: "Agriculture" },
        { descripcion: "Anthropology" },
        { descripcion: "Applied Science" },
        { descripcion: "Aquatic Science" },
        { descripcion: "Biotechnology" },
        { descripcion: "Food Science" },
        { descripcion: "Earth and Space Sciences" },
        { descripcion: "Astronomy" },
        { descripcion: "Environmental management" },
        { descripcion: "Geology" },
        { descripcion: "Oceanography" },
        { descripcion: "Geography" },
        { descripcion: "Life Science / Biology" },
        { descripcion: "Ecology" },
        { descripcion: "Zoology" },
        { descripcion: "Pharmaceutical Science" },
        { descripcion: "Clinical Pharmacy" },
        { descripcion: "Pharmaceutical Biology" },
        { descripcion: "Pharmaceutical Chemistry" },
        { descripcion: "Pharmaceutical Technology" },
        { descripcion: "Physical Sciences" },
        { descripcion: "Chemistry" },
        { descripcion: "Physics" }]
    },
    { descripcion: "Social Services" },
    { descripcion: "Social Studies" },
    { descripcion: "Space" },
    {
      descripcion: "Technology",
      detalle: [
        { descripcion: "ICT" },
        { descripcion: "Industrial Technology" }]
    },
    { descripcion: "Work Experience" }]*/
  }

  obtenerCatalogo() {
    return this.afs.collection('catalogo').valueChanges();
  }

  obtenerDetalleCatalogo(id: any) {
    return this.afs.collection('catalogo').doc(id).collection('subCategoria').valueChanges().pipe(
      map((cat: any) => {
        return cat
      })
    );
  }
  agregarCatalogos() {
    this.data.forEach((elem: any) => {
      this.afs.collection('catalogo').add({ descripcion: elem.descripcion }).then(cat => {
        cat.update({ id: cat.id }).then(() => {
          if (elem.detalle) {
            elem.detalle.forEach((element: any) => {
              cat.collection('subCategoria').add(element).then(sb => {
                sb.update({ id: sb.id });
              })
            });
          }
        });
      });
    })
  }

  actualizarCatalogo(obj: any) {
    return this.afs.collection('catalogo').doc(obj.id).update(obj);
  }
  actualizarDetalleCatalogo(catalogo: string, obj: any) {
    return this.afs.collection('catalogo').doc(catalogo).collection('subCategoria').doc(obj.id).update(obj);
  }
  cambiarImagen(path: string, imagen: FileList) {
    return this.srvRecurso.addGaleria(path, imagen)
  }

  obtenerCursos(categoriaId: string) {
    this.coleccionCursos = this.afs.collection('cursos')
    return this.coleccionCursos.get().toPromise().then((snapshot) => {
      var next = this.afs.collection('cursos', ref => ref.where('catedra', '==', categoriaId).where('creaId', '==', this.infoUsuario.uid));

      // Use the query for pagination
      // [START_EXCLUDE]
      return next.valueChanges();
      // [END_EXCLUDE]
    });
    // [END cursor_paginate]
  }

  obtenerCategorias() {
    this.coleccionCursos = this.afs.collection('catalogo')
    return this.coleccionCursos.get().toPromise().then((snapshot) => {
      let objTemp: any = []
      let obtTemp2: any = {}
      snapshot.docs.forEach(elem => {
        let x = elem.ref.collection('subCategoria')
        objTemp.push(elem.data())
        x.get().then(rt => {
          obtTemp2 = objTemp.find(temp => { return temp.id === x.parent.id })
          if (obtTemp2) {
            obtTemp2.detalle = [];
            rt.forEach(cat => {
              obtTemp2.detalle.push(cat.data());
            })
            objTemp.push(obtTemp2);
          }
        });
      })
      return objTemp;
    });

  }




}
