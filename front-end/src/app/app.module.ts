import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DataAccessService } from './services/data-access.service';
import { BlockchainAccessService } from './services/blockchain-access.service';
import { FirebaseAuthenticationService } from './services/firebase-authentication.service';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { MockComponent } from './components/mock/mock.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardCustomerComponent } from './components/dashboard-customer/dashboard-customer.component';
import { DashboardAuthorityComponent } from './components/dashboard-authority/dashboard-authority.component';
import { DashboardOperatorComponent } from './components/dashboard-operator/dashboard-operator.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { RoadsComponent } from './components/roads/roads.component';
import { CollectTollComponent } from './components/collect-toll/collect-toll.component';
import { BoothsComponent } from './components/booths/booths.component';
import { DashboardConnectorComponent } from './components/dashboard-connector/dashboard-connector.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    MockComponent,
    SignupComponent,
    LoginComponent,
    DashboardCustomerComponent,
    DashboardAuthorityComponent,
    DashboardOperatorComponent,
    RechargeComponent,
    VehiclesComponent,
    RoadsComponent,
    CollectTollComponent,
    BoothsComponent,
    DashboardConnectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [DataAccessService, BlockchainAccessService, FirebaseAuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
