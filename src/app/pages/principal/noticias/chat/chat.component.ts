import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from '../message';
import { NoticiasService } from '../noticias.service';


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

  private localStream: MediaStream;
  private peerConnection: RTCPeerConnection;

  inCall = false;
  localVideoActive = false;

  constructor(private srv: NoticiasService) { }

  ngAfterViewInit() {
    this.addIncominMessageHandler();
    this.requestMediaDevices();
  }

  private async requestMediaDevices(): Promise<void> {
    
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraint);
      this.localVideo.nativeElement.srcObject = this.localStream
    } catch (error) {
      console.log(error);
      alert(`GetUserMedia() error: ${error.name}`)
    }
  }

  pauseLocalVideo() {
    this.localStream.getTracks().forEach(track => {
      track.enabled = false;
    });
    this.localVideo.nativeElement.srcObject = undefined;
  }

  startLocalVideo() {
    this.localStream.getTracks().forEach(track => {
      track.enabled = true;
    });
    this.localVideo.nativeElement.srcObject = this.localStream;
  }

  async call() {
    this.createPeerConnection();

    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    try {
      const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer(offerOptions);
      await this.peerConnection.setLocalDescription(offer);

      this.inCall = true;

      this.srv.sendMessage({ type: 'offer', data: offer });
    } catch (error) {
      this.handleGetUserMediaError(error);
    }

  }

  hangup() {
    this.srv.sendMessage({ type: 'hangup', data: '' });
    this.closeVideoCall();
  }

  handleGetUserMediaError(err: Error) {
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
  createPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: ['stun:stun.kunderserver.de:3478'] }
      ]
    });

    this.peerConnection.onicecandidate = this.handleICECendidateEvent;
    this.peerConnection.onicegatheringstatechange = this.handleIceConnectionStateChangeEvent;
    this.peerConnection.onsignalingstatechange = this.handleSignalingStateEvent;
    this.peerConnection.ontrack = this.handleTrackEvent

  }

  private closeVideoCall() {
    if (this.peerConnection) {
      this.peerConnection.onicecandidate = null;
      this.peerConnection.onicegatheringstatechange = null;
      this.peerConnection.onsignalingstatechange = null;
      this.peerConnection.ontrack = null;
    }

    this.peerConnection.getTransceivers().forEach(transceiver => {
      transceiver.stop();
    })
    this.peerConnection.close();
    this.peerConnection = null
  }

  private handleICECendidateEvent = (event: RTCPeerConnectionIceEvent) => {
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
        this.closeVideoCall();
        break;
      case 'failed':
        this.closeVideoCall();
        break;
      case 'disconnected':
        this.closeVideoCall();
        break;

      default:
        break;
    }
  };
  private handleSignalingStateEvent = (event: Event) => {
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

  private addIncominMessageHandler() {
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
    }, error => {
      console.log(error);
    })
  }

  private handleofferMessage(msg: RTCSessionDescriptionInit) {
    if (!this.peerConnection) {
      this.createPeerConnection();
    }
    if (!this.localStream) {
      this.startLocalVideo();
    }
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg)).then(() => {
      this.localVideo.nativeElement.srcObject = this.localStream;
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);

      });
    }).then(() => {
      return this.peerConnection.createAnswer();
    }).then((answer) => {
      return this.peerConnection.setLocalDescription(answer);
    }).then(() => {
      this.srv.sendMessage({ type: 'answer', data: this.peerConnection.localDescription });
      this.inCall = true;
    }).catch(() => {
      this.handleGetUserMediaError
    })
  }
  private handleAnswerMessage(data: any) {
    this.peerConnection.setRemoteDescription(data);
  }
  private handleHangupMessage(msg: Message) {
    this.closeVideoCall();
  }
  private handleIceCandidateMessage(data: any) {
    this.peerConnection.addIceCandidate(data).catch(this.reportError);
  }

  private reportError(e: Error) {
    console.log('got Error: ' + e.name);
    console.log(e);

  }






}
