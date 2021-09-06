import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AwsCognitoService } from './service/aws.cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quwiz';
  heading = 'QuWiz - Online Quiz Conductor Wizard';

  constructor(public authService: AwsCognitoService) {}

  logout(): void {
    this.authService.logout();
  }
}
