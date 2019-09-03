import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/service.index';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class EntregaTrabajoService {

  private _user: UserInfo;
  public get user(): UserInfo {
    return this._user;
  }
  public set user(v: UserInfo) {
    this._user = v;
  }


  constructor(private srvAuth: AuthService,
    private afs: AngularFirestore, private router: Router) {
    this.srvAuth.userInfo.subscribe(resp => {
      this.user = resp;
    });
  }

  /* Agregar Tarea  */
  presentarTarea1(curso: any, tarea: any) {
    return this.afs
      .collection('alumnos').doc(this.user.uid)
      .collection('cursos').doc(curso.cursoId)
      .collection('tareas').valueChanges();
  }

  presentarTarea(curso: any, tarea: any) {
    return this.afs
      .collection('alumnos').doc(this.user.uid)
      .collection('cursos').doc(curso.cursoId)
      .collection('tareas').add(tarea);
  }


}
