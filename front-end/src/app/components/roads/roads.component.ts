import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';
import { sha256 } from 'js-sha256'
import { DataAccessService } from 'src/app/services/data-access.service';
import { Router } from '@angular/router';
import { BlockchainAccessService } from 'src/app/services/blockchain-access.service';
@Component({
  selector: 'app-roads',
  templateUrl: './roads.component.html',
  styleUrls: ['./roads.component.css']
})
export class RoadsComponent implements OnInit {
  roadStart: string = '';
  roadEnd: string = '';
  roadContractAmount: number = 0;
  roadContractDuration: string = '';
  carCharge: number = 0; 
  truckCharge: number = 0; 
  busCharge: number = 0;
  userId: string = '';
  user: any = null;
  myRoads:Array<any> = [];
  transferFrom: any;
  bal: any;

  constructor(private authService: FirebaseAuthenticationService, private afFirestore: AngularFirestore, private dataAcc:DataAccessService, private router: Router, private eth:BlockchainAccessService) {
    this.initEth();
   }

  ngOnInit() {
    this.authService.uid.subscribe(userId => {
      this.userId = userId;
      console.log(this.userId);
      
    })
    this.authService.userData.subscribe(data => {
      data.forEach(value => {
        if(value) {
          this.user = value;
          console.log(this.user);

          this.afFirestore.collection('roads', ref=> ref.where('user_id','==',this.userId)).valueChanges().subscribe(data => {
            this.myRoads = data;
          })
          
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
  addRoad() {

    let roadId = sha256(this.roadStart+this.roadEnd);
    this.afFirestore.collection('roads').doc(roadId).set({
        road_start_point: this.roadStart,
        road_end_point: this.roadEnd,
        road_contract_amount: this.roadContractAmount,
        road_contract_duration: this.roadContractDuration,
        road_collection: 0,
        road_id: roadId,
        car_charge: this.carCharge,
        bus_charge: this.busCharge,
        truck_charge: this.truckCharge,
        user_id: this.userId
    }).then(()=> {
      this.eth.addNewRoad(roadId, this.roadContractAmount, this.carCharge, this.truckCharge, this.busCharge, this.transferFrom).then(()=> {
        document.getElementById('success-notification').style.display = 'block';
      })
    })
  }
  hideNotifications() {
    document.getElementById('success-notification').style.display = 'none';
    document.getElementById('fail-notification').style.display = 'none';
  }
  deleteRoad(roadId) {

    this.afFirestore.collection('roads').doc(roadId).delete().then(()=>{

    })
    
  }

  showBooths (_roadId) {
    localStorage.setItem('currentRoadId', _roadId);
    this.router.navigateByUrl('booths');
  }

}
