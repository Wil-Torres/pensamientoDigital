import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  coleccionNotifiaciones: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) {}
  
  /* *******************************************************************
  **********************RESOURCE NOTIFICACIONES*************************
  *********************************************************************/
  
  async sendNotification(candidatos: any = [{id:'9KprCpB7DoRHtorFuKfRpNKH6Cn1'}], obj:any): Promise<void> {
    this.coleccionNotifiaciones = this.afs.collection<any>('users');
    try {
      const resp = await this.coleccionNotifiaciones.ref.get();
      console.log(resp.docs);
      let batch = this.afs.firestore.batch();
      resp.docs.forEach(userDocRef => {
        candidatos.forEach(element => {
          if (element.id === userDocRef.id) {
            userDocRef.ref.collection('notificaciones').add(obj);
          }
        });
        //batch.update(userDocRef.ref, {'score':0, 'leadsWithSalesWin': 0, 'leadsReported': 0})
      });
      batch.commit().catch(err => { console.log(err); });
    }
    catch (error) {
      return console.error(error);
    }

  }

  obtenerNotificaiones (id:string) {
    return this.afs.collection('users').doc(id).collection('notificaciones').valueChanges();
  }
  obtenerNotificaion (usuario: string, id:string) {
    return this.afs.collection('users').doc(usuario).collection('notificaciones').doc(id).valueChanges();
  }
  marcarLeido(userId: string, ntfId:any) {
    return this.afs.collection('users').doc(userId).collection('notificaciones').doc(ntfId).update({read:true});
  }


}

