import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaNoticiasComponent } from './lista-noticias/lista-noticias.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [ListaNoticiasComponent, ChatComponent],
  exports: [ListaNoticiasComponent, ChatComponent],
  imports: [
    CommonModule
  ]
})
export class NoticiasModule { }
