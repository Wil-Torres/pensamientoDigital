import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styles: ['.table{ width: 2000px !important;}']
})
export class EncuestaComponent implements OnInit {
  
  private _notas : any[] = [];
  public get notas() : any[] {
    return this._notas;
  }
  public set notas(v : any[]) {
    this._notas = v;
  }
  

  constructor() { }

  ngOnInit() {
    this.initObj();
  }

  initObj() {

    this.notas = [{estudiante :'Giselle  Laith  Zachary  Ahmed', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Drake  Ursa  Clark  Carissa', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Jermaine  Clarke  Boris  Cailin', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Claire  Donna  Courtney  Lucian', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Cheyenne  Giselle  Gary  Trevor', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Cody  Melissa  Larissa  Chelsea', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Tucker  Charles  Rowan  Roth', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Aretha  Chase  Paloma  Damon', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Yvonne  Tasha  Prescott  Thomas', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Melodie  Amery  Kadeem  Vernon', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Aimee  Camden  Gretchen  Cairo', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Nora  Cairo  Elliott  Lillith', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Fitzgerald  Gary  Lillith  Josiah', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Jared  Barclay  Wallace  Quentin', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Armando  Hunter  Marny  Ursa', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Amanda  Stacey  Moana  Piper', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Arden  Steel  Trevor  Vladimir', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Palmer  Mikayla  Penelope  Adena', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Kathleen  Tate  Regan  Sylvester', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Casey  Christine  Carly  Sara', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Cailin  Jane  Charlotte  Alfreda', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Rahim  Ann  Herrod  Brian', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Amos  Kameko  Harding  Angelica', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Philip  Charity  Honorato  Vladimir', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90},
    {estudiante :'Priscilla  Jackson  Grace  Wynter', noEntregado:3, incompleto: 2, ausente: 5, justificado: 1,
    nota1: 25, nota2: 30, nota3: 40, nota5: 45, nota6: 50, nota7: 55, nota8: 60, nota9: 65, nota10: 70, nota11: 75, nota12:85, nota13: 90}]

  }

}




