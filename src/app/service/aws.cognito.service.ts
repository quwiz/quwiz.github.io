import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AwsCognitoService {
  constructor(private http: HttpClient) { }

  public getTokenDetailsFromCognito(callbackCode: string): Observable<any> {
    const details = {
      grant_type: 'authorization_code',
      code: callbackCode,
      scope: 'openid+profile',
      redirect_uri: environment.REDIRECT_URL
    };
    const formBody = Object.keys(details)
                           .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`)
                           .join('&');

    return this.http.post<any>(environment.COGNITO_TOKEN_URL,
      formBody, {
        responseType: 'json',
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET}`)
          })
        });
  }

  public logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.assign(environment.LOGOUT_URL);
  }

  public isAuthenticated(): boolean {
    const authKeys = ['id_token', 'access_token', 'refresh_token'];

    const keysExists = authKeys.reduce((acc: boolean, k: string) => {
      return (k in localStorage) && acc;
    }, true);

    return keysExists;
  }

  public completeAuthentication(response: any): void {
    localStorage.setItem('id_token', response.id_token);
    localStorage.setItem('access_token', `${response.token_type} ${response.access_token}`);
    localStorage.setItem('refresh_token', response.refresh_token);
  }
}
