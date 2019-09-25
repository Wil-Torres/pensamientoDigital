export interface Ciclo {
  id: string;
  ciclo: number;
  estado: string;
  fechaCreacion: Date;
  usuarioId: string;
}

export interface gradoSeccion{
  id: string;
  ciclo: string;
  estado: string;
  carrera: string;
  grado: string;
  seccion: string;
  fechaCreacion: Date;
  usuarioId: string;
}

export interface Carrera {
  id: string;
  usuarioId: string;
  estado: string;
  fechaCreacion: Date;
  descripcion: string;
  codigo: number;
}
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/service.index';
import { UserInfo } from 'src/app/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  
  usuarioInfo: UserInfo;
  private _ciclos : AngularFirestoreCollection<Ciclo>;
  private _carreras : AngularFirestoreCollection<Carrera>;


  public get carreras() : AngularFirestoreCollection<Carrera> {
    return this._carreras;
  }
  public set carreras(v : AngularFirestoreCollection<Carrera>) {
    this._carreras = v;
  }
  
  public get ciclos() : AngularFirestoreCollection<Ciclo> {
    return this._ciclos;
  }
  public set ciclos(v : AngularFirestoreCollection<Ciclo>) {
    this._ciclos = v;
  }
  

  constructor(private afs: AngularFirestore, private srvAuth: AuthService) { 
    this.srvAuth.userInfo.subscribe(usuario => {
      this.usuarioInfo = usuario;
    })
  }

  /* ****************************************************************************
  ********************************** CICLOS *************************************
  *******************************************************************************
  */
  getCiclos(){
    this.ciclos = this.afs.collection('ciclos')
    return  this.ciclos.valueChanges();
  }
  getCiclo(id: string){
    return this.afs.collection('ciclos').doc(id).valueChanges();
  }
  postCiclo(obj:Ciclo){
    return this.afs.collection('ciclos').add(obj)
  }
  putCiclo(obj:Ciclo){
    return this.afs.collection('ciclos').doc(obj.id).update(obj)
  }
  deleteCiclo(obj:Ciclo){
    return this.afs.collection('ciclos').doc(obj.id).delete();
  }
  

  /* ****************************************************************************
  ********************************** CARRERAS ***********************************
  *******************************************************************************
  */
 getCarreras(){
  this.carreras = this.afs.collection('carreras')
  return  this.carreras.valueChanges();
 }
 getCarrera(id: string){
  return this.afs.collection('carreras').doc(id).valueChanges();
 }
 postCarrera(obj: Carrera){
  return this.afs.collection('carreras').add(obj)
 }
 putCarrera(obj: Carrera){
  return this.afs.collection('carreras').doc(obj.id).update(obj)
 }
 deleteCarrera(obj:Carrera){
  return this.afs.collection('carreras').doc(obj.id).delete();
 }

  /* ****************************************************************************
  **************************** GRADOS SECICIONES ********************************
  *******************************************************************************
  */
 getGradosSecciones(){}
 getGradoSeccion(){}
 postGradoSeccion(){}
 putGradoSeccion(){}
 deleteGradoSeccion(){}

  /* ****************************************************************************
  **********************************  *************************************
  *******************************************************************************
  */

}
