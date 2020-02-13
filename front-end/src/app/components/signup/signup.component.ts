import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router'
import { BlockchainAccessService } from 'src/app/services/blockchain-access.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
      console.log('acct is ', this.transferFrom);
      console.log('bal is ', this.bal);

    }).catch(err => {
      console.log(err);
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
