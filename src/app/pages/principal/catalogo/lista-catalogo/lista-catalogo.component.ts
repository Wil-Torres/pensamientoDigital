import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../catalogo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-lista-catalogo',
  template: `
      <div *ngIf="!numeroRegistro" class="d-flex justify-content-center">
        <h1>No hay datos <i class="fa fa-database text-danger"></i></h1>
      </div>
      <div class="card-deck" *ngIf="numeroRegistro">
      <div class="col-md-3" *ngFor="let obj of objeto; let i = index">
        <div class="card">
          <div>
            <a class="quick_edit_icon" data-toggle="collapse" [href]="'#collapse' + i" role="button"
                    aria-expanded="false" [attr.aria-controls]="'collapse'+1">
                    <i class="fa fa-cog inverted"></i>
                    <span class="textOffScreen">Quick edit this lesson</span>
                </a>

            </div>
            <div class="collapse quick_edit_box" [id]="'collapse' + i">
                <div class="card card-body">
                    <div>
                        <div class="arrow"></div>
                        <label for="tile_name_lesson_6233670">Descripciòn</label>
                        <input id="tile_name_lesson_6233670" type="text" class="form-control" [value]="obj.descripcion"
                            maxlength="100">


                        <label for="tile_color_lesson_6233670">Color</label>
                        <input id="tile_color_lesson_6233670" class="jscolor {position:'top'} form-control"
                            autocomplete="off"
                            style="background-image: none; background-color: rgb(95, 177, 170); color: rgb(0, 0, 0);">

                        <div class="tile_colors">
                            <a href="javascript:void(0)"
                                onclick="update_tile_color_input('#tile_color_lesson_6233670', '#569a96');"
                                style="background-color: #569a96"><span class="textOffScreen">Preset color 1</span></a>
                            <a href="javascript:void(0)"
                                onclick="update_tile_color_input('#tile_color_lesson_6233670', '#5fb1aa');"
                                style="background-color: #5fb1aa"><span class="textOffScreen">Preset color 2</span></a>
                            <a href="javascript:void(0)"
                                onclick="update_tile_color_input('#tile_color_lesson_6233670', '#97abaf');"
                                style="background-color: #97abaf"><span class="textOffScreen">Preset color 3</span></a>
                            <a href="javascript:void(0)"
                                onclick="update_tile_color_input('#tile_color_lesson_6233670', '#E47E78');"
                                style="background-color: #E47E78"><span class="textOffScreen">Preset color 4</span></a>
                        </div>
                        <br>

                        <a class="options_btn" onclick="initQuickEditBox(item);" href="javascript:void(0)">
                            <i class="fa fa-picture-o"></i>Change Picture
                        </a>
                        <div class="form-group">
                            <label for="cargarId">Imagen</label>
                            <input type="file" class="form-control-file" id="cargarId"
                                (change)="cargarInfo( $event.target.files )">
                        </div>

                        <div class="text-center">
                            <button type="button" id="cancel_btn" class="btn btn-outline-secondary"
                                (click)="cancelar()">
                                Cancel
                            </button>

                            <button type="button" id="save_btn" class="ml5 btn btn-primary"
                                (click)="actualizarDetalleCatalogo(obj)">
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <img [src]="obj.imagen" class="card-img-top tamanioImg" alt="...">
            <div class="card-body" (click)="mostrarDetalle(obj)">
                <h5 class="card-title">{{obj.descripcion}}</h5>
                <p class="card-text">SubCategoria - {{obj.descripcion}}.</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">10 cursos</small>
            </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .tamanioImg{
    height: 180px !important;
    width: 192px !important;
  }
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
.quick_edit_box .tile_colors ~ .options_btn {
margin-top: 9px;
}
.quick_edit_box .options_btn {
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
max-width: 100%;
display: inline-block;
box-sizing: border-box;
float: left;
margin-bottom: 12px;
}
.grey_background .leftColumn > .block, .grey_background .rightColumn .block, .grey_background #centreColumn > .block, .grey_background #centreColumn > div#account_block > div.block, .grey_background .leftColumn.block, .grey_background .options_btn {
border-color: #e2e0e0;
}
.options_btn {
display: inline-block;
font-size: 14px;
padding: 1px 8px 2px;
white-space: nowrap;
line-height: 23px;
margin: 3px 0;
border-radius: 3px;
background-color: #fff;
}
.leftColumn > .block, .rightColumn .block, #centreColumn > .block, #centreColumn > div#account_block > div.block, .leftColumn.block, .options_btn {
border: 1px solid #c8c8c8;
}
ul.tabnav li a:hover, nav#leftColumn ol li ul.tabnav a:hover, ul.tabnav li a.selected, nav#leftColumn ul.tabnav a.selected, ul.tabnav .dropDown a, ul.tabnav li a.selected span, ul.tabnav li a:hover span, .options_btn {
color: #222;
}`]
})
export class ListaCatalogoComponent implements OnInit {

  private _objeto: any = [];
  numeroRegistro: number;
  flDocto: FileList;
  public get objeto(): any[] {
    return this._objeto;
  }
  public set objeto(v: any[]) {
    this._objeto = v;
  }

  constructor(private srvCatalogo: CatalogoService, private router: Router,
    private aRoute: ActivatedRoute) { }

  ngOnInit() {
    this.srvCatalogo.obtenerCatalogo().subscribe((res: any) => {
      this.numeroRegistro = res.length
      res.forEach(element => {
        if (!element.imagen) {
          element.imagen = '../../../../../assets/images/Nueva carpeta/descarga.svg';
        }
      });
      this.objeto = res;
    })
  }

  mostrarDetalle(item: any) {
    this.router.navigate(['catalogo/lista-catalogo', item.id]);
  }

  cargarInfo(docto: FileList) {
    this.flDocto = docto;
  }
  cancelar() {
    this.flDocto = new FileList();
  }

  actualizarDetalleCatalogo(item: any) {
    if (this.flDocto) {
      let path = `catalogo/${item.id}/recursos`
      this.srvCatalogo.cambiarImagen(path, this.flDocto).then((resp: any) => {
        if (resp) {
          item.imagen = resp.url,
            item.fullPath = resp.fullPath,
            this.srvCatalogo.actualizarCatalogo(item).then(resp => {
              swal('Actualización', 'Se ha realizado actualizacion de categoria', 'success').then(() => { })
            }).catch(err => {
              swal('Ocurrio un error', err, 'error').then(() => { })
            })
        }

      })
    }

  }

}
