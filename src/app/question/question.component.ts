import {Component, OnInit} from '@angular/core';
import {QuestionsService} from '../service/questions.service';
import {TimerService} from '../service/timer.service';
import {QuWizToastrService} from '../service/toastr.service';
import * as dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {Option, Question, QuizTemplate} from '../shared/model/question.model';
import {QuizState} from '../shared/quiz-state';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

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

  quizTemplate: QuizTemplate | null = null;
  correctOption = -1;
  chosenOption = -1;
  activeRound = -1;
  template = '';
  timeLimit = 0;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private questionsService: QuestionsService,
              private timer: TimerService,
              private toastr: QuWizToastrService) {
    this.quizState = QuizState.LOADING;
    dayjs.extend(timezone);
    dayjs.extend(utc);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.template) {
        this.questionsService
          .getQuestionTemplate(params.template)
          .subscribe((response) => {
            this.quizTemplate = response;
            this.template = params.template;

            const heading = document.getElementById('heading');
            if ( heading !== null) {
              heading.innerHTML = response.title;
            }

            const titleImage: HTMLImageElement | null = document.getElementById('title_image_0') as HTMLImageElement;
            if ( titleImage !== null) {
              titleImage.src = response.titleImages[0].content;
            }

            if (params.round && params.question) {
              const round: number | undefined = parseInt(params.round, 10);
              if (round === undefined || !((round - 1) >= 0 && (round - 1) < this.quizTemplate.rounds.length)) {
                const message = `Invalid round index: ${params.round}`;
                this.toastr.toastError(message);
                console.error(message);
                return;
              }
              this.activeRound = round - 1;

              const i: number | undefined = parseInt(params.question, 10);
              if (i === undefined || i < 1 || i > this.quizTemplate.rounds[this.activeRound].questions.length) {
                const message = `Invalid question index: ${params.question}`;
                this.toastr.toastError(message);
                console.error(message);
                return;
              }

              this.currentQuestionIndex = i - 2;
              this.nextQuestion();
            }
            this.quizState = QuizState.INIT;
          });
        // TODO: Add error handling
      }
    });
  }

  public get QuizStateEnum(): typeof QuizState {
    return QuizState;
  }

  public get currentQuestionNumber(): string {
    return String(this.currentQuestionIndex + 1).padStart(2, '0');
  }

  startQuiz(round: number): void {
    this.activeRound = round;
    this.quizState = QuizState.NEXT_QUESTION;
    this.currentQuestionIndex = -1;
    this.timer.resetTimer();
    this.timerString = '--:--';
    this.chosenOption = -1;
    this.nextQuestion();
    this.location.go(`/quiz/${this.template}/${this.activeRound + 1}/1`);
  }

  isQuizStarted(): boolean {
    return this.quizState > QuizState.INIT;
  }

  countDown(seconds: number): void {
    const inst = this;

    const onCountdown = (ts: number) => {
      inst.timerString = dayjs.unix(ts).utc().format('mm:ss');
    };

    const onTimeUp = () => {
      // this.revealAnswer();
    };

    this.timer.countdown(seconds, onCountdown, onTimeUp);
  }

  markSelected(e: MouseEvent, index: number): void {
    if (this.chosenOption > -1) {
      return;
    }
    const target = (e.target || e.srcElement || e.currentTarget) as any;

    document.querySelectorAll('li.option p').forEach((el: Element) => {
      el.classList.remove('option-selected');
    });
    target.classList.add('option-selected');

    this.chosenOption = index;
  }

  get multimedia(): string {
    // TODO: Refactor: Generate content based on the content type
    const content = this.currentQuestion.meta.multimedia[0].content;
    return '<img class="question-multimedia" src="' + content + '"/>';
  }

  nextQuestion(): void {
    this.quizState = QuizState.LOADING;
    this.currentQuestionIndex += 1;

    this.timer.resetTimer();
    this.timerString = '--:--';

    if (this.quizTemplate == null) {
      console.error('Quiz Template might not have been loaded!');
      return;
    }

    if (this.currentQuestionIndex >= this.quizTemplate.rounds[this.activeRound].questions.length) {
      this.currentQuestionIndex -= 1; // TODO: Check and fix this
      this.quizState = QuizState.NEXT_QUESTION;
      this.toastr.toastWarning('No more questions for this round!');
      return;
    }

    const nextId = this.quizTemplate.rounds[this.activeRound].questions[this.currentQuestionIndex];

    this.questionsService
      .getQuestionById(nextId)
      .subscribe((response: Question) => {
        this.currentQuestion = response;

        this.correctOption = response.options.reduce((p: number, c: Option) => {
          return (response.options[p].weight > c.weight) ? p : response.options.indexOf(c);
        }, 0);

        this.chosenOption = -1;

        this.quizState = QuizState.NEXT_QUESTION;

        if (this.quizTemplate?.rounds[this.activeRound].countdownAutoStart) {
          this.countDown(this.quizTemplate?.rounds[this.activeRound].questionTime);
        }

        this.location.go(`/quiz/${this.template}/${this.activeRound + 1}/${this.currentQuestionIndex + 1}`);
      });
  }

  revealAnswer(): void {
    const chosenOption = 'option' + (this.chosenOption + 1);
    const correctOption = 'option' + (this.correctOption + 1);

    document.getElementById(correctOption)?.classList.add('option-correct');

    if (this.chosenOption === this.correctOption) {
      document.getElementById(chosenOption)?.classList.add('option-chosen-correct');
    }
    else {
      document.getElementById(chosenOption)?.classList.add('option-chosen-incorrect');
    }

    this.timer.resetTimer();
    this.timerString = '--:--';

    this.correctOption = -1;
    this.chosenOption = -1;
  }

  startTimer(): void {
    if (this.quizTemplate === null) {
      this.toastr.toastError('Quiz template might not have been initialised!');
      return;
    }

    this.countDown(this.quizTemplate.rounds[this.activeRound].questionTime);
  }

  resetTimer(): void {
    this.timer.resetTimer();
    this.timerString = '--:--';
  }

  closeQuiz(): void { }

  hasMultimedia(): boolean {
    return this.currentQuestion?.meta?.multimedia?.length > 0;
  }
}
