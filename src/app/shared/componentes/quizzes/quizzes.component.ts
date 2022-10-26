import { Component, OnInit } from '@angular/core';
import { QuizDataServicesService } from './quiz-data-services.service';
import { QuizMetricsService } from './quiz-metrics.service';
import { isNil } from 'lodash'

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  private activeQuestion = 0;
  private numQuestionAnswered = 0;
  private error = false;
  finalise = false;
  quizes = {
    quizQuestion: []
  }
  metricas: any;

  constructor(private srv1: QuizDataServicesService, private srv2: QuizMetricsService) {
    this.quizes = this.srv1.dataObject;
    this.metricas = this.srv2.quizObj;
  }

  ngOnInit() {
  }

  showQuiz = () => {
    this.metricas.quizActive = true;
  }
  questionAnswered = () => {
    let tamañoPregunta = this.quizes.quizQuestion.length;
    if (this.quizes.quizQuestion[this.activeQuestion].selected !== null) {
      this.numQuestionAnswered++;
      if (this.numQuestionAnswered >= tamañoPregunta) {
        //finaliza QUiz
        for (let i = 0; i < tamañoPregunta; i++) {
          if (this.quizes.quizQuestion[i].selected === null) {
            this.setActiveQuestion(i);
            return;
          }
        }
        this.finalise = true;
        this.metricas.quizActive = false;
        return
      } else {
        this.setActiveQuestion(this.activeQuestion + 1);
      }
    } else {
      this.setActiveQuestion(this.activeQuestion + 1);
    }
  }
  cerrarError = () => {
    this.error = false;
  }
  cancelaConfirmacion = () => {
    this.finalise = false;
    this.metricas.quizActive = true;
  }
  confirmar = () => {
    this.metricas.quizActive = false;
    this.finalise = false;
    this.numQuestionAnswered = 0;
    this.activeQuestion = 0;
    this.metricas.markQuiz(this.quizes);
    this.metricas.changeState('results', true);

  }
  setActiveQuestion = (index: any) => {
    if (isNil(index)) {
      let breakOut = false;
      let tamañoPregunta = this.quizes.quizQuestion.length - 1;
      while (!breakOut) {
        this.activeQuestion = this.activeQuestion < tamañoPregunta ? ++this.activeQuestion : 0;
        if (this.activeQuestion === 0) {
          this.error = true;
        }
        if (this.quizes.quizQuestion[this.activeQuestion].selected === null) {
          breakOut = true;
        }
      }
    } else {
      this.activeQuestion = index;
    }
  }
  selectAnswered = (index) => {
    this.quizes.quizQuestion[this.activeQuestion].selected = index;

  }
  getClaseRespuesta = (index) => {
    if (index === this.metricas.correctAnswers[this.activeQuestion]) {
      return 'bg-success';
    } else if (index === this.quizes.quizQuestion[this.activeQuestion].selected) {
      return 'bg-danger'
    }
  }
  calcularPorcentaje = () => {
    return this.metricas.numCorrect / this.quizes.quizQuestion.length * 100
  }


  quizMetricsController($quizDataServices: any) {
    var quizObj = {
      quizActive: false,
      resultsActive: false,
      correctAnswers: [],
      numCorrect: 0,
      changeState: function (metrica, state) {
        if (metrica === 'quiz') {
          this.quizActive = state;
        } else if (metrica === 'results') {
          this.resultsActive = state;
          this.quizActive = false;
        } else {
          return false;
        }
      },
      markQuiz: function () {
        this.correctAnswers = $quizDataServices.correctAnswers;
        for (let i = 0; i < $quizDataServices.quizQuestion.length; i++) {
          if ($quizDataServices.quizQuestion[i].selected === $quizDataServices.correctAnswers[i]) {
            $quizDataServices.quizQuestion[i].correct = true,
              this.numCorrect++;
          } else {
            $quizDataServices.quizQuestion[i].correct = false;
          }

        }


      }
    }
    return quizObj

  }

  quizDataServicesController() {
    let dataObject = {
      quizQuestion: [1, 2, 3, 0, 2, 0, 3, 2, 0, 3],
      correctAnswers: [
        {
          type: "text",
          text: "How much can a loggerhead weigh?",
          possibilities: [
            {
              answer: "Up to 20kg"
            },
            {
              answer: "Up to 115kg"
            },
            {
              answer: "Up to 220kg"
            },
            {
              answer: "Up to 500kg"
            }
          ],
          selected: null,
          correct: null
        },
        {
          type: "text",
          text: "What is the typical lifespan of a Green Sea Turtle?",
          possibilities: [
            {
              answer: "150 years"
            },
            {
              answer: "10 years"
            },
            {
              answer: "80 years"
            },
            {
              answer: "40 years"
            }
          ],
          selected: null,
          correct: null
        },
        {
          type: "image",
          text: "Which of these is the Alligator Snapping Turtle?",
          possibilities: [
            {
              answer: "https://c1.staticflickr.com/3/2182/2399413165_bcc8031cac_z.jpg?zz=1"
            },
            {
              answer: "http://images.nationalgeographic.com/wpf/media-live/photos/000/006/cache/ridley-sea-turtle_688_600x450.jpg"
            },
            {
              answer: "https://static-secure.guim.co.uk/sys-images/Guardian/Pix/pictures/2011/8/13/1313246505515/Leatherback-turtle-007.jpg"
            },
            {
              answer: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Alligator_snapping_turtle_-_Geierschildkr%C3%B6te_-_Alligatorschildkr%C3%B6te_-_Macrochelys_temminckii_01.jpg"
            }
          ],
          selected: null,
          correct: null
        },
        {
          type: "image",
          text: "Which of these is the Green Turtle?",
          possibilities: [
            {
              answer: "http://www.what-do-turtles-eat.com/wp-content/uploads/2014/10/Sea-Turtles-Habitat.jpg"
            },
            {
              answer: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Kemp's_Ridley_sea_turtle_nesting.JPG"
            },
            {
              answer: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Alligator_snapping_turtle_-_Geierschildkr%C3%B6te_-_Alligatorschildkr%C3%B6te_-_Macrochelys_temminckii_01.jpg"
            },
            {
              answer: "http://assets.worldwildlife.org/photos/163/images/carousel_small/SCR_290360hawskbill-why-matter-LG.jpg?1345565532"
            }
          ],
          selected: null,
          correct: null
        },
        {
          type: "text",
          text: "Where does the Kemp's Ridley Sea Turtle live?'",
          possibilities: [
            {
              answer: "Tropical waters all around the world"
            },
            {
              answer: "Eastern Australia"
            },
            {
              answer: "Coastal North Atlantic"
            },
            {
              answer: "South pacific islands"
            }
          ],
          selected: null,
          correct: null
        },
        {
          type: "text",
          text: "What is the most common turtle in US waters?",
          possibilities: [
            {
              answer: "Loggerhead turtle"
            },
            {
              answer: "Leatherback turtle"
            },
            {
              answer: "Hawksbill Turtle"
            },
            {
              answer: "Alligator Snapping Turtle"
            }
          ],
          selected: null,
          correct: null
        },
        {
          type: "text",
          text: "What is the largest sea turtle on earth?",
          possibilities: [
            {
              answer: "Eastern Snake Necked Turtle"
            },
            {
              answer: "Olive Ridley Sea Turtle"
            },
            {
              answer: "Kemp's Ridley Sea Turtle'"
            },
            {
              answer: "Leatherback"
            }
          ],
          selected: null,
          correct: null
        },
        {
          type: "image",
          text: "Which of these is the Olive Ridley Turtle?",
          possibilities: [
            {
              answer: "http://i.telegraph.co.uk/multimedia/archive/02651/loggerheadTurtle_2651448b.jpg"
            },
            {
              answer: "http://assets.worldwildlife.org/photos/163/images/carousel_small/SCR_290360hawskbill-why-matter-LG.jpg?1345565532"
            },
            {
              answer: "http://images.nationalgeographic.com/wpf/media-live/photos/000/006/cache/ridley-sea-turtle_688_600x450.jpg"
            },
            {
              answer: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Kemp's_Ridley_sea_turtle_nesting.JPG"
            }
          ],
          selected: null,
          correct: null
        },
        {
          type: "text",
          text: "How Heavy can a leatherback turtle be?",
          possibilities: [
            {
              answer: "900kg"
            },
            {
              answer: "40kg"
            },
            {
              answer: "110kg"
            },
            {
              answer: "300kg"
            }
          ],
          selected: null,
          correct: null
        },
        {
          type: "text",
          text: "Which of these turtles are herbivores?",
          possibilities: [
            {
              answer: "Loggerhead Turtle"
            },
            {
              answer: "Hawksbill Turtle"
            },
            {
              answer: "Leatherback Turtle"
            },
            {
              answer: "Green Turtle"
            }
          ],
          selected: null,
          correct: null
        }
      ]
    }
    return dataObject;
  }

}
