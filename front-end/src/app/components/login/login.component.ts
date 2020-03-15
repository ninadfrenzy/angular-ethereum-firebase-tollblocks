import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

/* 
LOGIN COMPONENT
- implements login functionality, by simply using a method on firebase auth which checks existence of a registered user and returns a reference to that user if found.
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string = '';
  password:string = '';
  
  constructor(private afAuth:AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }
  hideNotifications() {
    document.getElementById('notification-fail').style.display = 'none';
  }
  login() {
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((userRef) => {
        if(userRef) {
          this.router.navigateByUrl('dash');
        }
      }).catch(err => {
        console.log('error in logging user in', err);
        document.getElementById('notification-fail').style.display = 'block';
      })
    
  }
}
