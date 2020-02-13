import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';
import { BlockchainAccessService } from 'src/app/services/blockchain-access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.css']
})
export class DashboardCustomerComponent implements OnInit {
  currentBalance:number = 0;
  uid:string='';
  constructor(private authService:FirebaseAuthenticationService, private eth:BlockchainAccessService, public router:Router) { }

  ngOnInit() {
    this.authService.uid.subscribe(uid=> {
      this.uid = uid;
      this.eth.getBalance(this.uid).then(data=> {
        if(data) {
          this.currentBalance = data['value']
        }
        
      })
    })
  }

}
