import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appUpload]'
})
export class UploadDirective {
  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
  ondrop($event) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }
  @HostListener('dragover', ['$event'])
  ondragover($event){
    $event.preventDefault();
    this.hovered.emit(true);
  }
  @HostListener('dragleave', ['$event'])
  ondragleave($event){
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
