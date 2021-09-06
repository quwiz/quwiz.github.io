import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../service/questions.service';
import { environment } from '../../environments/environment';
import {AwsCognitoService} from '../service/aws.cognito.service';
import {QuizTemplateIdentity} from '../shared/model/question.model';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  templates: QuizTemplateIdentity[] = [];
  selectedTemplate = '';

  constructor(private questionsService: QuestionsService,
              public authService: AwsCognitoService) {  }

  ngOnInit(): void {
    this.questionsService.getAllTemplateIds()
      .subscribe((response) => {
        this.templates = response;
      });
  }
}
