import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leccion-nuevo-edicion',
  templateUrl: './leccion-nuevo-edicion.component.html',
  styles: [`
  .noVisible{
    visibility: hidden !important;
  }  
  `]
})
export class LeccionNuevoEdicionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let selectores: any = document.getElementsByClassName('selector');
    let panelCentral: any = document.getElementById('panelCentral');
    panelCentral.classList.remove('col-md-10');
    panelCentral.classList.add('col-md-12');
    let panelDerecho: any = document.getElementById('panelDerecho');
    panelDerecho.classList.add('noVisible');
    //panelDerecho.parentNode.removeChild(panelDerecho);

    
  }
  ngOnDestroy () {
    let panelDerecho: any = document.getElementById('panelDerecho');
    panelDerecho.classList.remove('noVisible');

    let panelCentral: any = document.getElementById('panelCentral');
    panelCentral.classList.remove('col-md-12');
    panelCentral.classList.add('col-md-10');


  }

}
