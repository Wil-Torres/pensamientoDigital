import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from './profesores.service';
import { RxSpeechRecognitionService, resultList } from '@kamiazya/ngx-speech-recognition';
import { SpeechSynthesisUtteranceFactoryService, SpeechSynthesisService } from '@kamiazya/ngx-speech-synthesis';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styles: [],
  providers: [
    SpeechSynthesisUtteranceFactoryService
  ]
})
export class ListaProfesoresComponent implements OnInit {
  listaProfesor: any = [];
  numeroRegistro: number;
  message = '';
  contents = [
    'AngularJS is a superheroic JavaScript MVC framework for the Web. We call it superheroic because AngularJS does so much for us that we only have to focus on our core application and let AngularJS take care of everything else. It allows us to apply standard, tried-and-tested software engineering practices traditionally used on the server side in client-side programming to accelerate frontend development. It provides a consistent scalable structure that makes it a breeze to develop large, complex applications as part of a team.',
  ];
  constructor(private srvProfesor: ProfesoresService, private router: Router,
    // servicio para hablar
    public service: RxSpeechRecognitionService,
    // servicio para escuchar, reproducir
    public f: SpeechSynthesisUtteranceFactoryService,
    public svc: SpeechSynthesisService) {
    service.lang = 'es-ES'
  }

  ngOnInit() {
    this.buscar();
  }

  buscar(offset: number = 0, limit: number = 10) {
    this.srvProfesor.getProfesores(offset, limit).then(prof => {
      prof.subscribe(resp => {
        this.listaProfesor = resp
        this.numeroRegistro = this.srvProfesor.paginacion.totalRegistros;
        console.log(resp)
        console.log(this.srvProfesor.paginacion.totalRegistros)
      })
    })

  }
  nuevo() {
    this.router.navigate(['profesores/nuevo']);
  }
  edicion(id: string) {
    this.router.navigate(['profesores', id]);
  }



  listen() {
    this.service
      .listen()
      .pipe(resultList)
      .subscribe((list: SpeechRecognitionResultList) => {
        this.message = list.item(0).item(0).transcript;
        console.log('RxComponent:onresult', this.message, list);
      });
  }

  speech() {
    for (const text of this.contents) {
      const v = this.f.text(text);
      this.svc.speak(this.f.text(text));
    }
  }

  cancel() {
    this.svc.cancel();
  }
  pause() {
    this.svc.pause();
  }

  resume() {
    this.svc.resume();
  }


}
