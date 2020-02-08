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
  isOperator:boolean = null;
  constructor(private afAuth:AngularFireAuth, private router: Router, private afFirestore: AngularFirestore) { }

  ngOnInit() {
  }
  hideNotifications() {
    document.getElementById('notification-fail').style.display = 'none';
  }
  login() {
    if(!this.isOperator) {
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((userRef) => {
        if(userRef) {
          this.router.navigateByUrl('mock');
        }
      }).catch(err => {
        document.getElementById('notification-fail').style.display = 'block';
      })
    } else {
        this.afFirestore.collection('users').doc(this.email).valueChanges().subscribe(data => {
          if(data) {
            if(data['password'] == this.password) {
              this.router.navigateByUrl('mock')
            } else {
              document.getElementById('notification-fail').style.display = 'block';
            }
            
          } else {
            
            document.getElementById('notification-fail').style.display = 'block';
          }
        })
    }
  }
}
