import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/internal-compatibility';
import { Message } from './message';

export const WS_ENDPOINT = 'ws://idpc4662:8081';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private socket$: WebSocketSubject<any>
  private messagesSubject = new Subject<Message>();
  public messages$ = this.messagesSubject.asObservable();

  constructor() { }

  public connect() {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();

      this.socket$.subscribe(msg => {
        console.log('Received message of type: ' + msg.type);
        this.messagesSubject.next(msg);
      })
    }
  }

  sendMessage(msg: Message) {
    console.log('Sending message' + msg.type);
    this.socket$.next(msg);
  }

  private getNewWebSocket() {
    return webSocket({
      url: WS_ENDPOINT,
      openObserver: {
        next: () => {
          console.log('NoticiasServices: Connection [OK]');
        }
      },
      closeObserver: {
        next: () => {
          console.log('NoticiasSevices: Conenction closed');
          this.socket$ = undefined;
          this.connect();
        }
      }
    })
  }
}
