import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInfo, User } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/service.index';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private afs: AngularFirestore, private auth: AuthService) { }

  agregarUsuario(obj: User){
    return this.auth.signUp(obj.email, obj.password, obj);
    //return this.afs.collection('users').add(obj);
  }
}
