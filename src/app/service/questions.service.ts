import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Question, QuizTemplate, QuizTemplateIdentity} from '../shared/model/question.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  getAllTemplateIds(): Observable<QuizTemplateIdentity[]> {
    return this.http.get<QuizTemplateIdentity[]>(`${ environment.API_BASE_URL }/api/v1.0/templates/list`);
  }

  getQuestionTemplate(id: string): Observable<QuizTemplate> {
    return this.http.get<QuizTemplate>(`${ environment.API_BASE_URL }/api/v1.0/template/${ id }`);
  }

  getQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(`${ environment.API_BASE_URL }/api/v1.0/question/${ id }`);
  }
}
