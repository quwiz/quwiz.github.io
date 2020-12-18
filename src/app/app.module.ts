import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { SplashComponent } from './splash/splash.component';
import { HTTPAuthInterceptor } from './service/http.auth.interceptor';
import { IconsComponent } from './common/icons/icons.component';
import { SpinnerComponent } from './common/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    SplashComponent,
    IconsComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
