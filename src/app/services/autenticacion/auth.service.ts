import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { User, UserInfo } from '../../interfaces/login'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  userInfo: Observable<UserInfo>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { 

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
    this.userInfo = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<UserInfo>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  signUp (email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(resp => {
      console.log('success!', resp);
      this.updateUser(resp.user)
    }).catch(err => {
      console.log('something went wrong:', err.message);
    })
  }

  login(email: string, password: string){
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err.message)
    })
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  // SignIn Google
  googleLogin() {
    console.log('hola');
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return new Promise ((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(provider).then((credenciales) => {
        resolve(this.updateUser(credenciales.user));
        this.router.navigate(['/'])
      }).catch(err => {
        console.log(err);
      })
    }) 
  }
  private updateUser(authData) {
    const user = new User(authData);

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {reader: true},
      phoneNumber: '12345678',
      password: ''
    }

    return userRef.set(data, { merge: true })
    
    //const userRef: AngularFirestoreDocument<User> = this.afs.doc(`usuarios/${authData.uid}`);
    
    /*var userRef = this.afs.collection('usuarios').doc(authData.uid);
    var getDoc = userRef.get().subscribe(doc => {
      if (!doc.exists) {
        this.afs.collection('usuarios').doc(userData.uid).set({
          uid:userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          phoneNumber: userData.phoneNumber,
          password: null,
          photoURL: userData.photoURL,
          roles: {reader: true}
        })
      } else {
        this.afs.collection('usuarios').doc(userData.uid).set({
          uid:userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          phoneNumber: userData.phoneNumber,
          password: null,
          photoURL: userData.photoURL,
          roles: {reader: true}
        })
      }
      getDoc.unsubscribe()
    })*/
    
    // userRef.update(userData);
    //return userRef.valueChanges();
  }

  
  // Start listing users from the beginning, 1000 at a time.
  
}
