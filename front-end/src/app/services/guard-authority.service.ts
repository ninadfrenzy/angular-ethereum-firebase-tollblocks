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
export class GuardAuthorityService {
  constructor(private authService:FirebaseAuthenticationService, private router:Router) {

  }

 canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   return new Promise((resolve, reject) => {

     this.authService.userData.subscribe(data => {
       if(data) {
         data.forEach(value => {
           if(value['type'] == 'authority') {
             return resolve(true)
           }
           else {
             this.router.navigateByUrl('route-not-found')
             return reject(false)
           }
         })
       } else {
         this.router.navigateByUrl('route-not-found')
         return reject(false)
       }
     })
   })

 }
}
