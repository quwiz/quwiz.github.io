import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { SplashComponent } from './splash/splash.component';
import { TokenResolverService } from './service/token-resolver.service';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'quiz/:template/start',
    component: QuestionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'quiz/:template/:round/:question',
    component: QuestionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: SplashComponent,
    resolve: {
      access: TokenResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
