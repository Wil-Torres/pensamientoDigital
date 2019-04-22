import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-marca-edicion',
  templateUrl: './marca-nuevo-edicion.component.html',
  styleUrls: ['./marca-nuevo-edicion.component.css']
})
export class MarcaEdicionComponent implements OnInit {
  estado: string = 'Edicion';
  objeto: any = {}
  marcas: Observable<any[]>;

  constructor() { }

  ngOnInit() {
  }

}
