import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';
import { BlockchainAccessService } from 'src/app/services/blockchain-access.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard-authority',
  templateUrl: './dashboard-authority.component.html',
  styleUrls: ['./dashboard-authority.component.css']
})
export class DashboardAuthorityComponent implements OnInit {

  currentBalance:number = 0;
  uid:string='';
  user:any=null;
  collected:number = 0;
  constructor(private authService:FirebaseAuthenticationService, private eth:BlockchainAccessService, public router:Router, private afFirestore:AngularFirestore) { }

  ngOnInit() {
    this.authService.uid.subscribe(uid=> {
      this.uid = uid;
      this.afFirestore.collection('roads', ref => ref.where('user_id','==', this.uid)).valueChanges().subscribe(data => {
        if(data) {
          let coll = 0;
          for(let i=0;i<data.length;i++) {
            coll = coll + data[i]['road_collection'];
          }
          this.collected = coll;
        }
        
      })
    })

  }
}
