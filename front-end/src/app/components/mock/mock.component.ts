import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css']
})
export class MockComponent implements OnInit {

  constructor(public authService: FirebaseAuthenticationService, public afAuth:AngularFireAuth) { }

  ngOnInit() {
    
      this.authService.userData.subscribe(userData => {
        if(userData) {
          userData.forEach(v => {
            console.log(v);
            
          })
        }

        
      })
   
    
  }

}
