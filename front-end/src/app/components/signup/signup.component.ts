import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router'
import { BlockchainAccessService } from 'src/app/services/blockchain-access.service';
/*
SIGNUP COMPONENT
- initializes ethereum account for transaction to the contract which will store a user once created in the form of a struct mapping (uid => user) where
 user has balance, and a transaction hash.
- when user clicks on signup, firebase method for creating a user is called , which returns a unique uid, which is user to store user data in firestore as well as contract mapping.
- finally notification is handled based on success / error conditions.

*/ 
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
  transferFrom: any = null;
  bal:any = null;
  constructor(private afAuth:AngularFireAuth, private afFirestore: AngularFirestore, public router: Router, private eth:BlockchainAccessService) { 
    this.initEth();
  }

  ngOnInit() {
  }
  initEth(){
    
    this.eth.getAccountInfo().then((acctInfo:any) => {
      this.transferFrom = acctInfo.fromAccount;
      this.bal = acctInfo.balance;
      console.log('blockchain current account is',{ from: this.transferFrom, balance: this.bal });
      
    }).catch(err => {
      console.log('initializing ethereum blockchain failed', err);
    });
  }
  signUp() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then((userRef) => {
      this.afFirestore.collection('users').doc(userRef.user.uid).set({
        name: this.name,
        type: this.type
      }).then(() => {
        this.eth.setNewUser(userRef.user.uid,this.transferFrom).then((status) => {
          document.getElementById('notification-success').style.display='block';
          this.afAuth.auth.signOut().then(() => {
            this.router.navigateByUrl('login')
          })
        }).catch(err => {
          console.log('Ethereum blockchain user was not set', err);
        })

      }).catch(err => {
        console.log('Firebase firestore access error', err);
        document.getElementById('notification-fail').style.display='block';
      })
    }).catch(err => {
      console.log('Account was not created or already exists', err);
      document.getElementById('notification-fail').style.display='block';
    })
    
  }
  hideNotifications() {
    document.getElementById('notification-success').style.display='none';
    document.getElementById('notification-fail').style.display='none';
  }

}
