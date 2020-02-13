import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string = '';
  password:string = '';
  
  constructor(private afAuth:AngularFireAuth, public router: Router, private afFirestore: AngularFirestore) { }

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
        document.getElementById('notification-fail').style.display = 'block';
      })
    
  }
}
