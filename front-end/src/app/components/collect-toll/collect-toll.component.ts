import { Component, OnInit } from '@angular/core';
import { sha256 } from 'js-sha256'
import { AngularFirestore } from '@angular/fire/firestore';
import { BlockchainAccessService } from 'src/app/services/blockchain-access.service';
import { parse } from 'querystring';
@Component({
  selector: 'app-collect-toll',
  templateUrl: './collect-toll.component.html',
  styleUrls: ['./collect-toll.component.css']
})
export class CollectTollComponent implements OnInit {
  isBoothLoggedIn: boolean = false;
  boothUname:string = '';
  boothPwd:string = '';
  currentBooth:any = null;
  vehicleId:string = '';
  transferFrom: any;
  bal: any;
  transactionDone: any;
  constructor(private afFirestore:AngularFirestore, private eth:BlockchainAccessService) { 
    this.initEth();
  }

  ngOnInit() {
    let loggedIn = localStorage.getItem('isBooth');
    if(loggedIn && loggedIn == 'true') {
      this.isBoothLoggedIn = true;
      this.currentBooth = JSON.parse(localStorage.getItem('currentBooth'))

    } else {
      this.isBoothLoggedIn = false;
      this.currentBooth = null;
    }
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
  loginBooth() {
    console.log('hey');
    
    this.afFirestore.collection('booths').doc(sha256(this.boothUname)).valueChanges().subscribe(data => {
      if(data) {
        if(this.boothPwd === data['booth_pwd']) {
          this.isBoothLoggedIn = true;
          localStorage.setItem('isBooth', 'true');
          this.currentBooth = data;
          localStorage.setItem('currentBooth', JSON.stringify(data));

        } else {
          //failure
        }
        
      }
    })
  }
  logoutBooth() {
    localStorage.removeItem('isBooth');
    localStorage.removeItem('currentBooth');
    this.isBoothLoggedIn = false;
    this.currentBooth = null;
  }

  collectToll () {

    console.log(this.currentBooth['road_id'], this.vehicleId, this.currentBooth['booth_id'], this.transferFrom);
    
    this.eth.validateAndCollect(this.currentBooth['road_id'], this.vehicleId, this.currentBooth['booth_id'], this.transferFrom).then(data => {
      this.eth.getBoothCollection(this.currentBooth['booth_id']).then(data => {
        let boothCollection = data['value'];
        this.afFirestore.collection('booths').doc(this.currentBooth['booth_id']).update({
          booth_collection: parseInt(boothCollection)
        }).then(()=>{
          console.log('done');
          
        })
        
      })
      this.eth.getRoadCollection(this.currentBooth['road_id']).then((data) => {
        let roadCollection = data['value'];
        this.afFirestore.collection('roads').doc(this.currentBooth['road_id']).update({
          road_collection: parseInt(roadCollection)
        }).then(() => {
          console.log('done');
          
        })
        
      })
      //make a txn and store it

      if(data) {
        let txnReciept = data['status']['receipt'];
        let txnForAuthority = {
          sender: txnReciept['from'],
          reciever: txnReciept['to'],
          hash: txnReciept['transactionHash'],
          gas: txnReciept['gasUsed'],
          user_id: this.currentBooth['user_id'],
          type: 'toll collection'
        }
        this.transactionDone = txnForAuthority;
        this.afFirestore.collection('transactions').add(txnForAuthority).then(()=>{

        })
        this.afFirestore.collection('vehicles').doc(sha256(this.vehicleId)).valueChanges().subscribe(op => {
          let txnForCustomer = {
            sender: txnReciept['from'],
            reciever: txnReciept['to'],
            hash: txnReciept['transactionHash'],
            gas: txnReciept['gasUsed'],
            user_id: op['user_id'],
            type: 'toll collection'
          }
          this.afFirestore.collection('transactions').add(txnForCustomer).then(()=>{

          })
        })
      }
      

    })
  }
  hideNotification() {
    document.getElementById('success-notification').style.display = 'none'
  }
  
}
