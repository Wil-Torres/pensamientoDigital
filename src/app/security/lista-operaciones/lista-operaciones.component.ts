import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface Operacion {
  actualiza: boolean;
  consulta: boolean;
  crea: boolean;
  ejecuta: boolean;
  elimina: boolean;
  id: string
  menu: boolean;
  operacionId: number
  password: string;
  requiereMotivo: boolean;
  requierePass: boolean;
  rol: string;
}
@Component({
  selector: 'gt-lista-operaciones',
  templateUrl: './lista-operaciones.component.html',
  styles: []
})
export class ListaOperacionesComponent implements OnInit {

  private _lista: any[] = [];

  private _forma: FormGroup;
  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }

  public get lista(): any[] {
    return this._lista;
  }
  public set lista(v: any[]) {
    this._lista = v;
  }


  constructor(private afs: AngularFirestore, private builder: FormBuilder) {
    this._forma = this.builder.group({
      actualiza: false,
      consulta: false,
      crea: false,
      ejecuta: false,
      elimina: false,
      id: null,
      menu: false,
      operacionId: null,
      password: null,
      requiereMotivo: false,
      requierePass: false,
      rol: null,
    })
  }

  ngOnInit() {

    this.afs.collection('roles_accesos').valueChanges().subscribe(resp => {
      this._lista = resp;
    })
  }

  guardar() {
    this.afs.collection('roles_accesos').add(this._forma.getRawValue()).then(resp => {
      resp.update({ id: resp.id }).then(() => { })
    })
  }
  cancelar() {
    this._forma.reset();
  }

}
