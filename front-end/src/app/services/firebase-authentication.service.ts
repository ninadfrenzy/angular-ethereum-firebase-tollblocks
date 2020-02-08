import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';
import { DataAccessService } from './data-access.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {
  uid = this.afAuth.authState.pipe(
    map(authState => {
      if(!authState) {
        return null;
      } else {
        return authState.uid;
      }
    })
  )
  userData = this.afAuth.authState.pipe(
    map(authState => {
      if(!authState) {
        return null;
      } else {
        return this.db.collection('users').doc(authState.uid).valueChanges();
      }
    })
  )
  constructor(private afAuth: AngularFireAuth, private dataService: DataAccessService, private db: AngularFirestore) { }

}
