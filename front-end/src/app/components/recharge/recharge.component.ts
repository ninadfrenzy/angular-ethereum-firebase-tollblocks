import { Component, OnInit } from '@angular/core';
import { BlockchainAccessService } from 'src/app/services/blockchain-access.service';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  rechargeAmount:number=0;
  previousAmount: number; 
  transferFrom: any = null;
  bal:any = null;
  uid:string = '';
  username: any;
  txnSender: any;
  txnReciever: any;
  txnHash: any;
  txnGas: any;
  constructor(public eth:BlockchainAccessService, public authService:FirebaseAuthenticationService) {
     
    this.initEth();
    
  }

  ngOnInit() {
    this.authService.userData.subscribe(data=>{
      data.forEach(value=>{
        if(value){
        this.username=value['name'];}

      })
    })
    this.authService.uid.subscribe(uid=> {
      this.uid = uid;
      this.eth.getBalance(this.uid).then(data=> {
        if(data) {
          this.previousAmount = data['value']
        }
        
      })
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
  
  putValueInRechargeInput(val:number){
    this.rechargeAmount=val;
  }
  hideNotification(){
    document.getElementById('success-recharge').style.display="none";
  }
  userRecharge(){
    console.log('blkchn -',this.uid, this.rechargeAmount, this.transferFrom);
    
    this.eth.addBalance(this.uid, this.rechargeAmount, this.transferFrom).then(data=>{
      console.log(data);
      
      this.txnSender = data['receipt']['from'];
      this.txnReciever = data['receipt']['from'];
      this.txnHash = data['receipt']['transactionHash'];
      this.txnGas = data['receipt']['gasUsed'];
      this.eth.getBalance(this.uid).then(data=>{
        if(data){
          this.previousAmount=data['value'];
          document.getElementById('success-recharge').style.display="block";
          document.getElementById('reciept').style.display="block";
        }
      });
    })
  }
}
