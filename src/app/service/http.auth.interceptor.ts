import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPAuthInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers: any = {};

    if('access_token' in localStorage) {
      headers['Authorization'] = localStorage.getItem('access_token');
    }

    return next.handle(httpRequest.clone({ setHeaders: headers }));
  }
}
