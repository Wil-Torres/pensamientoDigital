import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {

  
  private _usuaConectado : any[] = [];
  
  private _numeroRegistro : number;
  get numeroRegistro() : number {
    return this._numeroRegistro;
  }
  set numeroRegistro(v : number) {
    this._numeroRegistro = v;
  }
  
  get usuaConectado() : any[] {
    return this._usuaConectado;
  }
  set usuaConectado(v : any[]) {
    this._usuaConectado = v;
  }
  

  constructor() { }

  ngOnInit() {
    this.usuaConectado = [{'nombre':'Hayden', 'apellido':	'Ewing', 'email':	'quis@necurnaet.ca',	'id':'160006058002'},
    {'nombre':'Britanney', 'apellido':	'Patrick', 'email':	'blandit.enim.consequat@tinciduntaliquam.org',	'id':'160103251484'},
    {'nombre':'Damian', 'apellido':	'Gray', 'email':	'eget.volutpat.ornare@euultrices.ca',	'id':'160303297873'},
    {'nombre':'Renee', 'apellido':	'Wise', 'email':	'ultrices@musAenean.edu',	'id':'160401201124'},
    {'nombre':'Ulla', 'apellido':	'Hardy', 'email':	'egestas.a.scelerisque@Mauris.edu',	'id':'160505186304'},
    {'nombre':'Steel', 'apellido':	'Branch', 'email':	'quam.elementum@lectus.co.uk',	'id':'160511241671'},
    {'nombre':'Harriet', 'apellido':	'Dale', 'email':	'erat.nonummy.ultricies@fringillamilacinia.ca',	'id':'160604104109'},
    {'nombre':'Jocelyn', 'apellido':	'Wilkerson', 'email':	'facilisis@mauris.com',	'id':'160810201046'},
    {'nombre':'Abbot', 'apellido':	'Tanner', 'email':	'dui.semper@tellus.com',	'id':'160901226969'}]

    this.numeroRegistro = this.usuaConectado.length;

  }



}
