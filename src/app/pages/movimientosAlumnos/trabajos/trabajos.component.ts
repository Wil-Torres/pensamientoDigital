import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../alumno.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styles: []
})
export class TrabajosComponent implements OnInit {
  private _forma: FormGroup;

  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }

  constructor(private builder: FormBuilder, private alumno: AlumnoService) {

    alumno.inicializar();
    this._forma = this.builder.group({
      descripcionTarea: new FormControl(`
      <p><span style="font-weight: bolder;">TAREA</span></p>
        <p>DSubir tarea antes de 23:59pm despues de ese horario no se podran subir tareas</p>
        <p><span style="font-weight: bolder;"><br></span></p>
        <table class="table table-bordered" style="width: 1009px;">
          <tbody>
            <tr>
              <td><span style="background-color: rgb(255, 255, 0);">CAMPO 1</span></td>
              <td><span style="background-color: rgb(255, 255, 0);">CAMPO 2</span></td>
              <td><span style="background-color: rgb(255, 255, 0);">CAMPO 3</span></td>
              <td><span style="background-color: rgb(255, 255, 0);">CAMPO 4</span></td>
              <td><span style="background-color: rgb(255, 255, 0);">&nbsp;CAMPO 5</span></td>
              <td><span style="background-color: rgb(255, 255, 0);">CAMPO 6</span></td>
              <td><span style="background-color: rgb(255, 255, 0);">CAMPO 7</span></td>
              <td><span style="background-color: rgb(255, 255, 0);">CAMPO 8</span></td>
              <td><span style="background-color: rgb(255, 255, 0);">CAMPO 9</span></td>
            </tr>
            <tr>
              <td>DESC1</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8<br><br></td>
            </tr>
          </tbody>
        </table>
      `),
    })
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

  ngOnInit() {
  }
  ngOnDestroy() {
    this.alumno.destruir();
  }

}

