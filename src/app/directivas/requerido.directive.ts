import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[gtRequerido]'
})
export class RequeridoDirective implements OnInit {

  constructor(private element: ElementRef) { }

  private recorrerElementos(elemento: any) {
    if (elemento.childNodes.length !== 0) {
      if (elemento.localName === 'label') {
        elemento.className += ' gt-asterisco';
      }

      if (elemento.localName === 'select') {
        elemento.setAttribute('required', true);
      }

      elemento.childNodes.forEach(elementoHijo => this.recorrerElementos(elementoHijo));
      return;
    }

    if (elemento.localName === 'label') {
      elemento.className += ' gt-asterisco';
      return;
    }

    if (elemento.localName === 'input') {
      elemento.setAttribute('required', true);
      return;
    }

    if (elemento.localName === 'textarea') {
      elemento.setAttribute('required', true);
      return;
    }
  }

  ngOnInit() {
    this.recorrerElementos(this.element.nativeElement);
  }

}
