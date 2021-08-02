import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Message } from '../message';
import { NoticiasService } from '../noticias.service';

export const ENV_RTCPeerConfiguration = environment.RTCPeerConfiguration;
const mediaConstraint = {
  audio: true,
  video: {
    with: 720, height: 540
  }
}
const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit {

  @ViewChild('local_video') localVideo: ElementRef
  @ViewChild('received_video') remoteVideo: ElementRef
  /* CHAT */
  @ViewChild('msgInput') msgInput: ElementRef
  @ViewChild('chatarea') chatarea: ElementRef

  private localStream: MediaStream;
  private peerConnection: RTCPeerConnection;
  private dataChannel: RTCDataChannel;
  private receiveChannel: RTCRtpReceiver;


  inCall = false;
  localVideoActive = false;

  
  

  constructor(private srv: NoticiasService) { }

  ngAfterViewInit(): void {
    this.addIncominMessageHandler();
    this.requestMediaDevices();
  }


  private async requestMediaDevices(): Promise<void> {

    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraint);


      // pause all tracks
      this.pauseLocalVideo();
    } catch (error) {
      console.log(error);
      alert(`GetUserMedia() error: ${error.name}`)
    }
  }

  pauseLocalVideo() {
    console.log('pause local stream');
    this.localStream.getTracks().forEach(track => {
      track.enabled = false;
    });
    this.localVideo.nativeElement.srcObject = undefined;
    this.localVideoActive = false
  }

  startLocalVideo() {
    this.localStream.getTracks().forEach(track => {
      track.enabled = true;
    });
    this.localVideo.nativeElement.srcObject = this.localStream;
    this.localVideoActive = true;
  }

  enviarMensaje() {
    var val = this.msgInput.nativeElement.value;
    this.chatarea.nativeElement.innerHTML += name + ": " + val + "<br />";

    //sending a message to a connected peer 
    this.dataChannel.send(val);
    this.msgInput.nativeElement.value = "";
  }

  async call(): Promise<void> {
    this.createPeerConnection();

    this.localStream.getTracks().forEach(track => this.peerConnection.addTrack(track, this.localStream)
    );

    try {
      const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer(offerOptions);
      await this.peerConnection.setLocalDescription(offer);

      this.inCall = true;

      this.srv.sendMessage({ type: 'offer', data: offer });
    } catch (error) {
      this.handleGetUserMediaError(error);
    }

  }

  hangup(): void {
    this.srv.sendMessage({ type: 'hangup', data: '' });
    this.closeVideoCall();
  }

  private handleGetUserMediaError(err: Error): void {
    switch (err.name) {
      case 'NotFoundError':
        alert('unable to open your call because no camera and/or microphone were found')

        break;
      case 'SecurityError':
        alert('Error in security')

        break;
      case 'PermissionDeniedError':
        alert('The user not permission')

        break;
      default:
        console.log(err);
        alert('Error opening your camera ' + err.message)
        break;
    }
    this.closeVideoCall();
  }
  private createPeerConnection(): void {
    console.log('creating PeerConnection...');
    this.peerConnection = new RTCPeerConnection(ENV_RTCPeerConfiguration);
    /*this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: ['stun:stun.kunderserver.de:3478'] }
      ]
    });*/

    this.peerConnection.onicecandidate = this.handleICECandidateEvent;
    this.peerConnection.oniceconnectionstatechange = this.handleIceConnectionStateChangeEvent;
    this.peerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
    this.peerConnection.ontrack = this.handleTrackEvent
    this.peerConnection.ondatachannel = this.handleDataChannelCallBack;

    /* Creamos un canal de comunicacion para enviar textos */

     // Let's make a data channel!
  const dataChannelParams = {ordered: false};
  
  

    this.dataChannel = this.peerConnection.createDataChannel('channel1', dataChannelParams);

    this.dataChannel.onerror = (error) => {
      console.log('Ooops----Error: ', error)
    }
    this.dataChannel.onopen = (event) => {
      console.log('Esbleciendo conexion de data chanel')
      if (this.dataChannel) {
        var state = this.dataChannel.readyState;

        if (state === "open") {
          console.log('Canal conectado')
        } else {
          console.log('Canal desconecado')
        }
      }

    }
    this.dataChannel.onmessage = (event) => {
      console.log(": " + event.data)
    }
    this.dataChannel.onclose = function () {
      console.log("data channel is closed");
    };



  }



  private closeVideoCall(): void {
    console.log('Closing call');
    if (this.peerConnection) {
      this.peerConnection.onicecandidate = null;
      this.peerConnection.oniceconnectionstatechange = null;
      this.peerConnection.onsignalingstatechange = null;
      this.peerConnection.ontrack = null;


      this.peerConnection.getTransceivers().forEach(transceiver => {
        transceiver.stop();
      })
      this.peerConnection.close();
      this.peerConnection = null
      this.inCall = false;

    }
  }


  private handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    console.log(event);
    if (event.candidate) {
      this.srv.sendMessage({
        type: 'ice-candidate',
        data: event.candidate
      })
    }
  };
  private handleIceConnectionStateChangeEvent = (event: Event) => {
    console.log(event);
    switch (this.peerConnection.iceConnectionState) {
      case 'closed':
      case 'failed':
      case 'disconnected':
        this.closeVideoCall();
        break;
    }
  };

  private handleSignalingStateChangeEvent = (event: Event) => {
    console.log(event);
    switch (this.peerConnection.signalingState) {
      case 'closed':
        this.closeVideoCall();
        break;
    }
  };
  private handleTrackEvent = (event: RTCTrackEvent) => {
    console.log(event);
    this.remoteVideo.nativeElement.srcObject = event.streams[0]   
  }

  private handleDataChannelCallBack = (event: RTCDataChannelEvent) => {
    this.dataChannel = event.channel;
    this.dataChannel.binaryType = 'arraybuffer';
    this.dataChannel.onclose = this.onReceiveChannelClosed;
    this.dataChannel.onmessage = this.onReceiveMessageCallback;
  }

  private addIncominMessageHandler(): void {
    this.srv.connect();
    this.srv.messages$.subscribe(msg => {
      switch (msg.type) {
        case 'offer':
          this.handleofferMessage(msg.data);
          break;
        case 'answer':
          this.handleAnswerMessage(msg.data);
          break;
        case 'hangup':
          this.handleHangupMessage(msg);
          break;
        case 'ice-candidate':
          this.handleIceCandidateMessage(msg.data);
          break;

        default:
          console.log('unknown message of type ' + msg.type)
          break;
      }
    }, error => console.log(error)
    )
  }

  private handleofferMessage(msg: RTCSessionDescriptionInit): void {
    console.log('handle incoming offer');
    if (!this.peerConnection) {
      this.createPeerConnection();
    }
    if (!this.localStream) {
      this.startLocalVideo();
    }

    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg)).then(() => {
      this.localVideo.nativeElement.srcObject = this.localStream;
      this.localStream.getTracks().forEach(track => this.peerConnection.addTrack(track, this.localStream)
      );
    }).then(() => {
      return this.peerConnection.createAnswer();
    }).then((answer) => {
      return this.peerConnection.setLocalDescription(answer);
    }).then(() => {
      this.srv.sendMessage({ type: 'answer', data: this.peerConnection.localDescription });
      this.inCall = true;
    }).catch(
      this.handleGetUserMediaError
    )
  }
  private handleAnswerMessage(data: any): void {
    console.log('handle incoming answer');
    this.peerConnection.setRemoteDescription(data);
  }
  private handleHangupMessage(msg: Message): void {
    console.log(msg);
    this.closeVideoCall();
  }

  private handleIceCandidateMessage(data: RTCIceCandidate): void {
    const candidate = new RTCIceCandidate(data)
    this.peerConnection.addIceCandidate(candidate).catch(this.reportError);
  }

  private reportError(e: Error) {
    console.log('got Error: ' + e.name);
    console.log(e);

  }

  private onReceiveChannelClosed (this: RTCDataChannel, ev: Event) {

  };
  private onReceiveMessageCallback (this: RTCDataChannel, ev: MessageEvent<any>): any {
    console.log(ev.data.length)    
    
  };






}
