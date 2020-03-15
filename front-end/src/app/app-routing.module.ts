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
import { GuardCustomerService } from './services/guard-customer.service';
import { Err404Component } from './components/err404/err404.component';
import { GuardAuthorityService } from './services/guard-authority.service';
import { GuardGenericService } from './services/guard-generic.service';


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
    component: MockComponent,
    
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dash',
    component: DashboardConnectorComponent,
    canActivate: [GuardGenericService]
  },
  {
    path: 'recharge',
    component: RechargeComponent,
    canActivate: [GuardGenericService]
  },
  {
    path: 'add-vehicles',
    component: VehiclesComponent,
    canActivate: [GuardGenericService]
  },
  {
    path: 'add-roads',
    component: RoadsComponent,
    canActivate: [GuardGenericService]
  },
  {
    path: 'booths',
    component: BoothsComponent,
    canActivate: [GuardGenericService]
  },
  {
    path: 'collect-toll',
    component: CollectTollComponent
  },
  {
    path: 'route-not-found',
    component: Err404Component
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
