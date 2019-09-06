import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CoreService } from 'src/app/services/service.index';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'gt-inicio-spinner',
  templateUrl: './gt-inicio-spinner.component.html',
  styles: []
})
export class GtInicioSpinnerComponent implements OnInit {
  private _visible = true;
  private _mensaje = 'Cargando datos...';
  private _cambioVisible: EventEmitter<boolean>;
  constructor(private core: CoreService, private spinner: NgxSpinnerService) {
    this._cambioVisible = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  desbloquear(): void {
    this.core.unlock(true);
    this._cambioVisible.emit(false);
  }

  get visible(): boolean {
    return this._visible;
  }

  @Input() set visible(value: boolean) {
    this._visible = value;
    if (value) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }

    this._cambioVisible.emit(value);
  }

  @Output() get cambioVisible(): EventEmitter<boolean> {
    return this._cambioVisible;
  }

  get mensaje(): string {
    return this._mensaje;
  }

  @Input() set mensaje(value: string) {
    this._mensaje = value;
  }
}
