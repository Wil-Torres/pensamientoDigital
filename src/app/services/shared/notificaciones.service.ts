import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UserInfo } from 'src/app/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  coleccionNotifiaciones: AngularFirestoreCollection<any>;
  private usuario: UserInfo = JSON.parse(localStorage.getItem('usuarioLogeado'));
  public y: any;
  
  constructor(private afs: AngularFirestore) {
    let x = this.obtenerAlumnoUsuario().then((resp) => {
      resp.forEach(elem => {
        this.y = elem.id;
      })
    });
  }
  
  /* *******************************************************************
  **********************RESOURCE NOTIFICACIONES*************************
  *********************************************************************/
  
  async sendNotification(candidatos: any = [], obj:any): Promise<void> {
    this.coleccionNotifiaciones = this.afs.collection<any>('alumnos');
    try {
      const resp = await this.coleccionNotifiaciones.ref.get();
      let batch = this.afs.firestore.batch();
      resp.docs.forEach(userDocRef => {
        candidatos.forEach(element => {
          if (element.id === userDocRef.id) {
            userDocRef.ref.collection('notificaciones').add(obj);
          }
        });
        //batch.update(userDocRef.ref, {'score':0, 'leadsWithSalesWin': 0, 'leadsReported': 0})
      });
      batch.commit().catch(err => { });
    }
    catch (error) {
      return console.error(error);
    }

  }

  obtenerNotificaiones (id:string) {
    return this.afs.collection('alumnos').doc(id).collection('notificaciones').valueChanges();
  }
  obtenerNotificaion (usuario: string, id:string) {
    return this.afs.collection('alumnos').doc(usuario).collection('notificaciones').doc(id).valueChanges();
  }
  marcarLeido(userId: string, ntfId:any) {
    return this.afs.collection('alumnos').doc(userId).collection('notificaciones').doc(ntfId).update({read:true});
  }

  async obtenerAlumnoUsuario() {
    
    return await this.afs.collection('alumnos').ref.where("email", "==", this.usuario.email).get();

  }


}

