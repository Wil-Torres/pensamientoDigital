import { Injectable, OnDestroy, OnInit, Inject } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';
import { DOCUMENT } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private oldMenu: any;

  constructor(@Inject(DOCUMENT) private _document, private _menu: SidebarService,
    private afs: AngularFirestore, private arouter: ActivatedRoute) {
      console.log(this.arouter);
    // this.oldMenu = _menu.menu;
  }

  destruir() {
    // this._menu.menu = this.oldMenu;
    let panelDerecho: any = document.getElementById('panelDerecho');
    panelDerecho.classList.remove('noVisible');

    let panelCentral: any = document.getElementById('panelCentral');
    panelCentral.classList.remove('col-md-12');
    panelCentral.classList.add('col-md-10');


  }
  inicializar() {

    let selectores: any = document.getElementsByClassName('selector');
    let panelCentral: any = document.getElementById('panelCentral');
    panelCentral.classList.remove('col-md-10');
    panelCentral.classList.add('col-md-12');
    let panelDerecho: any = document.getElementById('panelDerecho');
    panelDerecho.classList.add('noVisible');
    //panelDerecho.parentNode.removeChild(panelDerecho);


/*
    this._menu.menu = [
      {
        titulo: 'Contenido',
        icono: 'fa fa-university',
        url: '/alumno-mis-cursos',
        submenu: []
      },
      {
        titulo: 'Tareas',
        icono: 'fa fa-pencil-square-o',
        url: '/alumno-tareas',
        submenu: []
      },
      {
        titulo: 'Calificaciones',
        icono: 'fa fa-bookmark-o',
        url: '/alumno-calificaciones',
        submenu: []
      },
      {
        titulo: 'Anuncios',
        icono: 'fa fa-newspaper-o',
        url: '/alumno-historial',
        submenu: []
      }
    ]*/

  }

  obtenerAlumnoCursos() {
    return new Promise((resolve) => {
      let coleccionCursos = this.afs.collection('alumnos')
      return coleccionCursos.get().toPromise().then((snapshot) => {
        let objTemp: any = []
        let obtTemp2: any = {}
        snapshot.docs.forEach(elem => {
          let x = elem.ref.collection('cursos')
          objTemp.push({ alumnoId: elem.data().id })
          x.get().then(rt => {
            obtTemp2 = objTemp.find(temp => { return temp.alumnoId === x.parent.id })
            if (obtTemp2) {
              obtTemp2.cursos = [];
              rt.forEach(cat => {
                obtTemp2.cursos.push({ cursoId: cat.data().id });
              })
              objTemp.push(obtTemp2);
            }
          });
        })
        resolve(objTemp);
      });
    })
  }
}
