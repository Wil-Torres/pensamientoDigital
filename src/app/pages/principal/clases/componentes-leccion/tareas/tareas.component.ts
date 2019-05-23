import { Component, OnInit } from '@angular/core';
import { $$, $ } from 'protractor';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styles: [`
    .bordes-tarea{
      border-left: blue;
      border-style: double;
      border-top: 0;
      border-bottom: 0;
      border-right: 0;
    }
  `]
})
export class TareasComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  
  private _content : any;
  public get content() : any {
    return this._content;
  }
  public set content(v : any) {
    this._content = v;
  }
  

  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']]
    ],
    codemirror: { // codemirror options
      theme: 'monokai'
    },
    buttons: {
    }
  };

  imprimir () {
    console.log('hola')
    console.log(this.config);
  }

}
