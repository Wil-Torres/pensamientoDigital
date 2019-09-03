import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  data: any[];

  constructor(private afs: AngularFirestore) {
    this.data = [{
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
    { descripcion: "Work Experience" }]
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




}
