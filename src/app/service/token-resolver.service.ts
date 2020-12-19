import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, finalize, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AwsCognitoService } from './aws.cognito.service';

@Injectable({
  providedIn: 'root'
})
export class TokenResolverService implements Resolve<any> {

  constructor(private location: Location,
              private awsCognitoService: AwsCognitoService,
              private router: Router) { }

  resolve(): Observable<any | null> {

    const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    const code: string | null = urlParams.get('code');

    if (!code) {
      return of(null);
    }

    return this.getTokenDetailsFromCognito(code).pipe(
      finalize(() => {
        this.location.replaceState(window.location.pathname);
      })
    );
  }

  getTokenDetailsFromCognito(code: string): Observable<any | null> {
    const cognitoService = this.awsCognitoService;

    return this.awsCognitoService.getTokenDetailsFromCognito(code).pipe(
      switchMap((response: any) => {
        cognitoService.completeAuthentication(response);

        return of(response);
      }),
      catchError ((error) => {
        return error;
      })
    );
  }
}
