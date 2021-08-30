export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyCskimLt9xs8g0dpeKOF9STjHaej-NMq3Y",
    authDomain: "prueba-1df69.firebaseapp.com",
    databaseURL: "https://prueba-1df69.firebaseio.com",
    projectId: "prueba-1df69",
    storageBucket: "prueba-1df69.appspot.com",
    messagingSenderId: "609979743111"
  },
  //wsEndpoint: 'wss://fast-spire-23171.herokuapp.com/',
  wsEndpoint: 'ws://localhost:3000/',
  RTCPeerConfiguration: {
    iceServers: [
      {
        //urls: 'stun:stun1.l.google.com:19302'
        urls: 'stun:stun.kunderserver.de:3478'
      }
    ]
  }
};
