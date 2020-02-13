import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: FirebaseAuthenticationService, private afAuth: AngularFireAuth, public router:Router) { }

  ngOnInit() {

    
  }
  logOut() {
    this.afAuth.auth.signOut().then(()=> {
      this.router.navigateByUrl('login')
    })
  }

}
