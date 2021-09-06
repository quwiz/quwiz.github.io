import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { SplashComponent } from './splash/splash.component';
import { HTTPAuthInterceptor } from './service/http.auth.interceptor';
import { IconsComponent } from './common/icons/icons.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


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
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        FormsModule,
        CommonModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
