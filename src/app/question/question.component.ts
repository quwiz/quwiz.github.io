import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../service/questions.service';
import { TimerService } from '../service/timer.service';
import * as dayjs from 'dayjs';
import { Option, Question } from '../shared/model/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  private quizState: number;
  timerString = '--:--';
  currentQuestion: any;
  correctOption = -1;
  chosenOption = '';

  constructor(private questionsService: QuestionsService,
              private timer: TimerService) {
    this.quizState = 0;
  }

  ngOnInit(): void { }

  startQuiz(): void {
    this.quizState = 1;
    this.nextQuestion();
  }

  isQuizStarted(): boolean {
    return this.quizState === 1;
  }

  countDown(): void {
    const inst = this;

    const onCountdown = (ts: number) => {
      inst.timerString = dayjs.unix(ts).format('mm:ss');
    };

    const onTimeUp = () => {
      // this.revealAnswer();
    };

    this.timer.countdown(10, onCountdown, onTimeUp);
  }

  markSelected(e: MouseEvent): void {
    const target = (e.target || e.srcElement || e.currentTarget) as Element;

    document.querySelectorAll('li.option p').forEach((el: Element) => {
      el.classList.remove('option-selected');
    });
    target.classList.add('option-selected');

    this.chosenOption = target.attributes.id.nodeValue;
  }

  nextQuestion(): void {
    this.questionsService
      .getQuestionById('5fd6277e9d4a08a651906673')
      .subscribe((response: Question) => {
        this.currentQuestion = response;

        this.correctOption = response.options.reduce((p: number, c: Option) => {
          return (response.options[p].weight > c.weight) ? p : response.options.indexOf(c);
        }, 0) + 1;

        this.countDown();
      });
  }

  revealAnswer(): void {
    const correctOption = 'option' + this.correctOption;

    document.getElementById(correctOption).classList.add('option-correct');

    if(this.chosenOption) {
      if(this.chosenOption === correctOption) {
        document.getElementById(this.chosenOption).classList.add('option-chosen-correct');
      }
      else {
        document.getElementById(this.chosenOption).classList.add('option-chosen-incorrect');
      }
    }

    this.timer.resetTimer();

    this.correctOption = -1;
    this.chosenOption = '';
    this.timerString = '--:--';
  }

  closeQuiz(): void {

  }
}
