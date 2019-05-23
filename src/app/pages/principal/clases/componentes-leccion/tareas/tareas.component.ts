import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap';
declare var $;

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
  form: FormGroup;
  prueba: any = '<p>Hola que tal</p><p>qw</p><p>qwe</p>'
  constructor( private sanitizer: DomSanitizer, public modalRef: BsModalRef) {
    this.form = new FormGroup({
      html: new FormControl('<p>Hola que tal</p><p>qw</p><p>qwe</p>')
    });
   }

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
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr', 'div']]
    ]
  };

  editorDisabled = false;

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get('html').value);
  }

  

  imprimir () {
    console.log('hola')
    console.log(this.config);
    $('#summernote').summernote('code', null);
  }

  enableEditor() {
    this.editorDisabled = false;
  }

  disableEditor() {
    this.editorDisabled = true;
  }

  onBlur() {
    console.log('Blur');
  }
}
