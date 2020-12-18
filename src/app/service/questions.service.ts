import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Question } from '../shared/model/question.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }


  getQuestionTemplate(id: string): Observable<any> {
    return this.http.get<any>(`${ environment.API_BASE_URL }/quiz/templates/${ id }`);
  }

  getQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(`${ environment.API_BASE_URL }/questions/${ id }`);
  }
}
