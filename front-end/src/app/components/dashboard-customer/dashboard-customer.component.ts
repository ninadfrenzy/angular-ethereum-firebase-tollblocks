import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';
import { BlockchainAccessService } from 'src/app/services/blockchain-access.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.css']
})
export class DashboardCustomerComponent implements OnInit {
  currentBalance:number = 0;
  uid:string='';
  transactions:Array<any> = [];
  constructor(private authService:FirebaseAuthenticationService, private eth:BlockchainAccessService, public router:Router, private afFirestore:AngularFirestore) { }

  ngOnInit() {
    this.authService.uid.subscribe(uid=> {
      this.uid = uid;
      this.eth.getBalance(this.uid).then(data=> {
        if(data) {
          this.currentBalance = data['value']
        }
        
      })
      this.afFirestore.collection('transactions', ref => ref.where('user_id','==',this.uid)).valueChanges().subscribe(data => {
        this.transactions = data;
      })
    })
  }

}
