import { Injectable } from '@angular/core';
import { AuthService } from '../autenticacion/auth.service';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { isEmpty, intersection, keys, get } from 'lodash'
import { User } from 'src/app/interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  userRoles: Array<string>;
  usuario: User;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    private auth: AuthService, private afs: AngularFirestore
  ) { 
    auth.user.pipe(map(user => {
      this.usuario = user;
      return this.userRoles = keys(get(user, 'roles'))
    })
    ).subscribe()
  }
  getPosts() {
    this.itemsCollection = this.afs.collection<any>('posts');
    return this.itemsCollection.valueChanges();
  }
  getPost(key) {
    return this.afs.collection('posts').doc(key).valueChanges();
  }
  get canRead(): boolean {
    const allowed = ['admin', 'author', 'reader']
    return this.matchingRole(allowed)
  }

  get canEdit(): boolean {
    const allowed = ['admin', 'author']
    return this.matchingRole(allowed)
  }

  get canDelete(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }

  private matchingRole2(allowedRoles): boolean {
    return  !isEmpty(intersection(allowedRoles, this.userRoles))
  }

  private matchingRole(allowedRoles: string[]): boolean {
    if (!this.usuario) return false
    for (const role of allowedRoles) {
      if ( this.usuario.roles[role] ) {
        return true
      }
    }
    return false
  }

  editPost(post, newData) {
    if ( this.canEdit ) {
      return this.afs.collection('posts').doc(post.key).update(newData)
    }
    else console.log('action prevented!')
  }

  

  deletePost(key) {
    return this.afs.collection('posts').doc(key).delete()
    if ( this.canDelete ) {
      return this.afs.collection('posts').doc(key).delete()
    }
    else console.log('action prevented!')
  }
}
