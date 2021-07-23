import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment.prod';
import { Message } from './message';

//export const WS_ENDPOINT = 'ws://fast-spire-23171.herokuapp.com/';
export const WS_ENDPOINT = environment.wsEndpoint;
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private socket$: WebSocketSubject<Message>
  private messagesSubject = new Subject<Message>();
  public messages$ = this.messagesSubject.asObservable();

  constructor() { }

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();

      this.socket$.subscribe(msg => {
        console.log('Received message of type: ' + msg.type);
        this.messagesSubject.next(msg);
      })
    }
  }

  sendMessage(msg: Message): void {
    console.log('Sending message ' + msg.type);
    this.socket$.next(msg);
  }

  private getNewWebSocket(): WebSocketSubject<any>{
    return webSocket({
      url: WS_ENDPOINT,
      openObserver: {
        next: () => {
          console.log('Noticias Services: Connection [OK]');
        }
      },
      closeObserver: {
        next: () => {
          console.log('Noticias Sevices: Conenction closed');
          this.socket$ = undefined;
          this.connect();
        }
      }
    })
  }
}
