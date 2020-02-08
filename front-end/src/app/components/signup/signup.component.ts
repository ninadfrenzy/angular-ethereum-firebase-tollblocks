import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name:string = '';
  email:string = '';
  password:string = '';
  confirmPassword:string = '';
  type:string = '';
  constructor(private afAuth:AngularFireAuth, private afFirestore: AngularFirestore, private router: Router) { }

  ngOnInit() {
  }
  signUp() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then((userRef) => {
      this.afFirestore.collection('users').doc(userRef.user.uid).set({
        name: this.name,
        type: this.type
      }).then(() => {
        document.getElementById('notification-success').style.display='block';
        this.afAuth.auth.signOut().then(() => {
          this.router.navigateByUrl('login')
        })
      }).catch(err => {
        document.getElementById('notification-fail').style.display='block';
      })
    }).catch(err => {
      document.getElementById('notification-fail').style.display='block';
    })
    
  }
  hideNotifications() {
    document.getElementById('notification-success').style.display='none';
    document.getElementById('notification-fail').style.display='none';
  }

}
