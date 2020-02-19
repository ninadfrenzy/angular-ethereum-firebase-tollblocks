import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { MockComponent } from './components/mock/mock.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardConnectorComponent } from './components/dashboard-connector/dashboard-connector.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { RoadsComponent } from './components/roads/roads.component';
import { BoothsComponent } from './components/booths/booths.component';
import { CollectTollComponent } from './components/collect-toll/collect-toll.component';
import { SplashComponent } from './components/splash/splash.component';


const routes: Routes = [
  {
    path: '',
    component: SplashComponent
  },
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
  },
  {
    path: 'recharge',
    component: RechargeComponent
  },
  {
    path: 'add-vehicles',
    component: VehiclesComponent
  },
  {
    path: 'add-roads',
    component: RoadsComponent
  },
  {
    path: 'booths',
    component: BoothsComponent
  },
  {
    path: 'collect-toll',
    component: CollectTollComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
