import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from "@angular/router";
import { Observable } from "rxjs";
import { FirebaseAuthenticationService } from './firebase-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGenericService {
  constructor(private authService:FirebaseAuthenticationService, private router:Router) {

  }

 canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   return new Promise((resolve, reject) => {
      this.authService.uid.subscribe(userId => {
        if(userId) {
          return resolve(true)
        } else {
          this.router.navigateByUrl('login')
          return reject(false)
        }
      })
   })

 }
}
