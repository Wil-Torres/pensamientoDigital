import { Injectable } from '@angular/core';
import { QuizDataServicesService } from './quiz-data-services.service';

@Injectable({
  providedIn: 'root'
})
export class QuizMetricsService {
  srvData: QuizDataServicesService;
  quizObj: any = {};
  constructor(private $srvData: QuizDataServicesService) { 
    this.quizObj = {
      quizActive: false,
      resultsActive: false,
      correctAnswers: [],
      numCorrect: 0,
      changeState: function (metrica, state) {
        if (metrica === 'quiz') {
          this.quizActive = state;
        } else if (metrica === 'results') {
          this.resultsActive = state;
        } else {
          return false;
        }
      },
      markQuiz: function (srvData) {
        this.correctAnswers = srvData.correctAnswers;
        for (let i = 0; i < srvData.quizQuestion.length; i++) {
          if (srvData.quizQuestion[i].selected === srvData.correctAnswers[i]) {
            srvData.quizQuestion[i].correct = true,
              this.numCorrect++;
          } else {
            srvData.quizQuestion[i].correct = false;
          }
  
        }
  
  
      }
    }
  
  
  }

}
