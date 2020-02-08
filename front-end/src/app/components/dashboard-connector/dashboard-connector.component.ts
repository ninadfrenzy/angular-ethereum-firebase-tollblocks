import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-connector',
  templateUrl: './dashboard-connector.component.html',
  styleUrls: ['./dashboard-connector.component.css']
})
export class DashboardConnectorComponent implements OnInit {
  usertype:any = null;
  constructor(public authService: FirebaseAuthenticationService) { }

  ngOnInit() {
    this.authService.userData.subscribe(data => {
      data.forEach(item => {
        this.usertype = item['userType'];
      })
    })
  }

}
