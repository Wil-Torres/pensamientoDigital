import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../catalogo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-detalle-catalogo',
  template: `
    <div class="card-deck">
      <div class="col-md-4" *ngFor="let obj of objeto; let i = index">
          <div class="card">
            <div>
            <a class="quick_edit_icon" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
              <i class="fa fa-cog inverted"></i>
              <span class="textOffScreen">Quick edit this lesson</span>
            </a>
  
</div>
<div class="collapse quick_edit_box" id="collapseExample" >
  <div class="card card-body">
  <div><div class="arrow"></div>
  <label for="tile_name_lesson_6233670">Descripciòn</label>
  <input id="tile_name_lesson_6233670" type="text" class="form-control" value="Principios de Angular JS" maxlength="100">
  
  
    <label for="tile_color_lesson_6233670">Color</label>
    <input id="tile_color_lesson_6233670" class="jscolor {position:'top'} form-control" autocomplete="off" style="background-image: none; background-color: rgb(95, 177, 170); color: rgb(0, 0, 0);">
  
    <div class="tile_colors">
        <a href="javascript:void(0)" onclick="update_tile_color_input('#tile_color_lesson_6233670', '#569a96');" style="background-color: #569a96"><span class="textOffScreen">Preset color 1</span></a>
        <a href="javascript:void(0)" onclick="update_tile_color_input('#tile_color_lesson_6233670', '#5fb1aa');" style="background-color: #5fb1aa"><span class="textOffScreen">Preset color 2</span></a>
        <a href="javascript:void(0)" onclick="update_tile_color_input('#tile_color_lesson_6233670', '#97abaf');" style="background-color: #97abaf"><span class="textOffScreen">Preset color 3</span></a>
        <a href="javascript:void(0)" onclick="update_tile_color_input('#tile_color_lesson_6233670', '#E47E78');" style="background-color: #E47E78"><span class="textOffScreen">Preset color 4</span></a>
    </div>
    <br>
  
  <a class="options_btn" onclick="init_quick_edit_box('#quick_edit_box_lesson_6233670');new_page('/uploader?data_json=%7B%22wrapper%22%3A%22UploaderWrapperlesson_6233670%22%2C%22only_file%22%3Atrue%2C%22single_file%22%3Atrue%2C%22custom_name%22%3A%22tile_picture_lesson_6233670%22%2C%22file_type%22%3A%22image%22%7D');" href="javascript:void(0)" style="display: none;">
    <i class="picture"></i>Change Picture
  </a>
  <div class="form-group">
    <label for="cargarId">Imagen</label>
    <input type="file" class="form-control-file" id="cargarId">
  </div>
  
  <div class="text-center">
    <button type="button" id="cancel_btn" class="btn btn-outline-secondary">
      Cancel
    </button>
  
    <button type="button" id="save_btn" class="ml5 btn btn-primary" onclick="submit_quick_tile_editor('lesson_6233670', 'teacher_lessons', 1404718, 6233670)">
      Save
    </button>
  </div>
  
  </div>
  </div>
</div>
            <img [src]="obj.imagen" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{obj.descripcion}}</h5>
                <p class="card-text">Curso</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">4 Cursos</small>
            </div>
        </div>
      </div>
    </div>`,
  styles: [`
  .no-touch .quick_edit_icon, .no-touch .quick_edit_box {
      opacity: 0;
  }
  .quick_edit_icon {
      background-color: rgba(0,0,0,.2);
      border-radius: 3px;
      width: auto;
      margin: 0 -4px;
      padding: 1px 0 1px 3px;
      position: absolute;
      top: 10px;
      right: 14px;
      z-index: 2;
      line-height: 10px;
  }
  .guides a, .catalog_class #leftColumn a.button, .quick_edit_icon, .quick_edit_box, .profile_header a:not(.optionsRibbon) {
    transition: all .3s ease-in-out;
  }
  .quick_edit_box {
    margin: -8px 0 2px;
    padding: 5px 10px 0;
    top: 42px;
    z-index: 8;
    left: 2px;
    right: 2px;
}
.quick_edit_box, .quick_edit_box .arrow:after {
  box-shadow: 0 0 3px 1px rgba(0,0,0,.1);
  background-color: #fff;
  position: absolute;
  border: 1px solid #e2e0e0;
  border-radius: 3px;
}
.quick_edit_box .tile_colors {
  display: inline-block;
  margin-top: 4px;
  vertical-align: top;
}
.textOffScreen, #socialBlocks a span {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  transform: translatez(0);
}
.quick_edit_box .tile_colors a {
  float: left;
  width: 21px;
  height: 21px;
  margin-right: 5px;
}
.quick_edit_box input.jscolor {
  width: 61px;
  border: 1px solid #909090;
  padding: 4px 5px;
  margin: 0 9px 3px 0 !important;
}
.quick_edit_box label, #centreColumn .quick_edit_box input[type="text"], .quick_edit_box input, .quick_edit_box button {
  font-size: 14px;
}
.quick_edit_box input, #centreColumn .quick_edit_box input[type="text"] {
  width: 100%;
  margin: 0 0 9px !important;
}
  `]
})
export class ListaDetalleCatalogoComponent implements OnInit {
  private _objetoId: string = this.aRoute.snapshot.paramMap.get('id');;
  private _objeto: any = [];

  public get objetoId(): string {
    return this._objetoId;
  }
  public get objeto(): any[] {
    return this._objeto;
  }
  public set objeto(objeto: any[]) {
    this._objeto = objeto;
  }

  constructor(private srvCatalogo: CatalogoService, private aRoute: ActivatedRoute) { }

  ngOnInit() {

    this.srvCatalogo.obtenerDetalleCatalogo(this.objetoId).subscribe((res: any) => {
      res.forEach(element => {
        element.imagen = '../../../../../assets/images/Nueva carpeta/descarga.svg';
      });
      this.objeto = res;
    });
  }

}
