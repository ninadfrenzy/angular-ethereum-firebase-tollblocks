import { Component, OnInit} from '@angular/core';
import { DataAccessService } from './services/data-access.service';
import { FirebaseAuthenticationService } from './services/firebase-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  uname:string = '';
  pwd:string = '';
  ngOnInit() {
    
  }
  constructor(public userAuth:FirebaseAuthenticationService) {

  }



}
