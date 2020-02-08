import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { MockComponent } from './components/mock/mock.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardConnectorComponent } from './components/dashboard-connector/dashboard-connector.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'mock',
    component: MockComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dash',
    component: DashboardConnectorComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
