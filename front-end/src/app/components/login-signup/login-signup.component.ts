import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from '../../services/firebase-authentication.service'
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  
  userEmailForLogin: string = '';
  userPasswordForLogin: string = '';
  customerName: string = '';
  customerEmail: string = '';
  customerPasswordForSignUp: string = '';
  customerConfPasswordForSignUp: string = '';
  authorityName: string = '';
  userType:string = '';
  authorityEmail: string = '';
  authorityPasswordForSignUp: string = '';
  authorityConfPasswordForSignUp: string = '';
  

  constructor(private afAuth:AngularFireAuth,private afFirestore: AngularFirestore, private router: Router, ) {
    
  }
  ngOnInit() {
  }

  toggleSignUp() {
    this.userEmailForLogin = '';
    this.userPasswordForLogin = '';
    document.getElementById('container').classList.add('right-panel-active');
  }
  toggleSignIn() {
    this.customerName = '';

    this.customerEmail = '';
    this.customerPasswordForSignUp = '';
    this.customerConfPasswordForSignUp = '';
    this.authorityName = '';
    this.authorityEmail = '';
    this.authorityPasswordForSignUp = '';
    this.authorityConfPasswordForSignUp = '';
    document.getElementById('container').classList.remove('right-panel-active');
  }
  toggleFormCustomer() {
    this.authorityName = '';
    this.authorityEmail = '';
    this.authorityPasswordForSignUp = '';
    this.authorityConfPasswordForSignUp = '';
    this.userType = 'customer'
  }
  toggleFormAuthority() {
    this.customerName = '';
    this.customerEmail = '';
    this.customerPasswordForSignUp = '';
    this.customerConfPasswordForSignUp = '';
    this.userType = 'tollauthority';
  }
  signUp () {
    if(this.userType == 'customer') {
      this.afAuth.auth.createUserWithEmailAndPassword(this.customerEmail, this.customerPasswordForSignUp).then(userRef => {
        this.afFirestore.collection('users').doc(userRef.user.uid).set({
          user_type: 'customer',
          name: this.customerName
        }).then(() => {
          alert('user registered successfully');
          this.router.navigateByUrl('mock');
        })
      })
    } else {
      this.afAuth.auth.createUserWithEmailAndPassword(this.authorityEmail, this.authorityPasswordForSignUp).then(userRef => {
        this.afFirestore.collection('users').doc(userRef.user.uid).set({
          user_type: 'tollauthority',
          name: this.authorityName
        }).then(() => {
          alert('user registered successfully');
          this.router.navigateByUrl('mock');
        })
      })
    }
  }

  logIn() {
    this.afAuth.auth.signInWithEmailAndPassword(this.userEmailForLogin, this.userPasswordForLogin).then((userRef) => {
      if(userRef) {
        this.router.navigateByUrl('mock')
      }
    }).catch(err => {
      document.getElementById('errlogin').style.display = 'inline';
    })
  }

  
}