import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BlockchainAccessService } from 'src/app/services/blockchain-access.service';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css']
})
export class MockComponent implements OnInit {
  value:any;
  transferFrom: any = null;
  bal:any = null;
  roadId:string = null; 
  constructor(public authService: FirebaseAuthenticationService, public afAuth:AngularFireAuth, public eth:BlockchainAccessService, public dataAcc:DataAccessService) { 
    this.initEth();
  }

  ngOnInit() {
      
      this.roadId = localStorage.getItem('currentRoadId')
      this.authService.userData.subscribe(userData => {
        if(userData) {
          userData.forEach(v => {
            console.log(v);
            
          })
        }

        
      })
   
    
  }
  initEth(){
    let that = this;
    this.eth.getAccountInfo().then((acctInfo:any) => {
      that.transferFrom = acctInfo.fromAccount;
      that.bal = acctInfo.balance;
      console.log('acct is ', that.transferFrom);
      console.log('bal is ', that.bal);

    }).catch(err => {
      console.log(err);
    });
  }
  addUser(){
    this.eth.setNewUser(this.value, this.transferFrom).then(data => {
      console.log(data);
      
    })
  }

}
