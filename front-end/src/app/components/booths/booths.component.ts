import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {sha256} from 'js-sha256'
import { BlockchainAccessService } from 'src/app/services/blockchain-access.service';
@Component({
  selector: 'app-booths',
  templateUrl: './booths.component.html',
  styleUrls: ['./booths.component.css']
})
export class BoothsComponent implements OnInit {
  boothUsername:string = '';
  boothPassword:string = '';
  boothsArray:Array<any>=[];
  roadId:string = '';
  road:any=null;
  transferFrom: any;
  bal: any;
  constructor(private afFirestore:AngularFirestore, private eth:BlockchainAccessService) {
    this.initEth();
   }

  ngOnInit() {
    this.roadId = localStorage.getItem('currentRoadId');
    if(this.roadId) {
      this.afFirestore.collection('roads').doc(this.roadId).valueChanges().subscribe(data => {
        this.road = data;
        console.log(this.road);
        this.afFirestore.collection('booths', ref=> ref.where('road_id','==',this.roadId)).valueChanges().subscribe(data => {
          this.boothsArray = data;
        })    
      })
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
  addBooth() {

    let booth = {
      booth_uname: this.boothUsername,
      booth_pwd: this.boothPassword,
      booth_collection: 0,
      road_id: this.road['road_id'],
      user_id: this.road['user_id'],
      booth_id: sha256(this.boothUsername)
    }
    this.afFirestore.collection('booths').doc(sha256(this.boothUsername)).set(booth).then(()=>{
      this.eth.addBooth(sha256(this.boothUsername), this.transferFrom).then((data)=> {
        console.log(data);
        
      })
    })
  }

  deleteBooth(boothId) {

    this.afFirestore.collection('booths').doc(boothId).delete().then(()=>{

    })
  }
}
