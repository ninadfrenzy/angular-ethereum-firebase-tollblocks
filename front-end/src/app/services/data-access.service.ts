import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  private roadId = new BehaviorSubject(null);
  currentRoadId = this.roadId.asObservable();
  constructor(private afFirestore: AngularFirestore) { }

  setCurrentRoadId (_id) {
    this.roadId.next(_id);
  }

}
