import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../service/questions.service';
import { TimerService } from '../service/timer.service';
import * as dayjs from 'dayjs';
import { Option, Question } from '../shared/model/question.model';
import { QuizState } from '../shared/quiz-state';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  quizState: QuizState;
  timerString = '--:--';

  currentQuestionIndex = -1;
  currentQuestion: any;

  quizTemplate: any;
  correctOption = -1;
  chosenOption = '';
  activeRound = '';

  constructor(private questionsService: QuestionsService,
              private timer: TimerService) {
    this.quizState = 0;
  }

  ngOnInit(): void {
    this.questionsService
      .getQuestionTemplate('5fdc55559d4a08a651ffbe85')
      .subscribe((response) => {
        this.quizTemplate = response;
      });
  }

  public get QuizStateEnum(): typeof QuizState {
    return QuizState;
  }

  public get currentQuestionNumber(): string {
    return String(this.currentQuestionIndex + 1).padStart(2, '0');
  }

  startQuiz(round: string): void {
    this.activeRound = round;
    this.quizState = QuizState.NEXT_QUESTION;
    this.currentQuestionIndex = -1;
    this.timer.resetTimer();
    this.timerString = '--:--';
    this.chosenOption = '';
    this.nextQuestion();
  }

  isQuizStarted(): boolean {
    return this.quizState > QuizState.INIT;
  }

  countDown(seconds: number): void {
    const inst = this;

    const onCountdown = (ts: number) => {
      inst.timerString = dayjs.unix(ts).format('mm:ss');
    };

    const onTimeUp = () => {
      // this.revealAnswer();
    };

    this.timer.countdown(seconds, onCountdown, onTimeUp);
  }

  markSelected(e: MouseEvent): void {
    const target = (e.target || e.srcElement || e.currentTarget) as any;

    document.querySelectorAll('li.option p').forEach((el: Element) => {
      el.classList.remove('option-selected');
    });
    target.classList.add('option-selected');

    this.chosenOption = target.attributes.id.nodeValue;

    if(this.activeRound === 'round3') {
      this.countDown(this.quizTemplate[this.activeRound].questionTime);
    }
  }

  get multimedia(): string {
    // TODO: Refactor: Generate content based on the content type
    const content = this.currentQuestion.meta.multimedia[0].content;
    return '<img class="question-multimedia" src="' + content + '"/>';
  }

  nextQuestion(): void {
    this.quizState = QuizState.QUESTION_LOADING;
    this.currentQuestionIndex += 1;

    const questionTime = this.quizTemplate[this.activeRound].questionTime;
    const nextId = this.quizTemplate[this.activeRound].questions[this.currentQuestionIndex];

    this.questionsService
      .getQuestionById(nextId)
      .subscribe((response: Question) => {
        this.currentQuestion = response;

        this.correctOption = response.options.reduce((p: number, c: Option) => {
          return (response.options[p].weight > c.weight) ? p : response.options.indexOf(c);
        }, 0) + 1;

        this.quizState = QuizState.NEXT_QUESTION;

        if(this.activeRound !== 'round3') {
          this.countDown(questionTime);
        }
      });
  }

  revealAnswer(): void {
    const correctOption = 'option' + this.correctOption;

    document.getElementById(correctOption)?.classList.add('option-correct');

    if(this.chosenOption) {
      if(this.chosenOption === correctOption) {
        document.getElementById(this.chosenOption)?.classList.add('option-chosen-correct');
      }
      else {
        document.getElementById(this.chosenOption)?.classList.add('option-chosen-incorrect');
      }
    }

    this.timer.resetTimer();

    this.correctOption = -1;
    this.chosenOption = '';
    this.timerString = '--:--';
  }

  closeQuiz(): void {

  }

  hasMultimedia(): boolean {
    return this.currentQuestion?.meta?.multimedia?.length > 0;
  }
}
