import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marca-lista',
  templateUrl: './marca-lista.component.html',
  styleUrls: ['./marca-lista.component.css']
})
export class MarcaListaComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  nuevo (){
    alert('hola');
  }

  edicion () {
    this.router.navigate(['/edicion-marca'])
  }

}
