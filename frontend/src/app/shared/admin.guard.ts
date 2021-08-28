import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}
  canActivate(): boolean {
    if (this._auth.loggedIn() && this._auth.getUser() == 'admin') {
      // Swal.fire('Are You Sure').then(() => {});
      return true;
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'you are not allowed to do that',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        this._router.navigate(['/']);
      });
      return false;
    }
  }
}

// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AdminService } from './admin.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AdminGuard implements CanActivate {
//   constructor(private _admin: AdminService, private _router: Router) {}
//   // canActivate(
//   //   route: ActivatedRouteSnapshot,
//   //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//   //   return true;
//   // }
//   canActivate(): boolean {
//     if (this._admin.loggedIn()) {
//       console.log('true');
//       return true;
//     } else {
//       this._router.navigate(['/login']);
//       return false;
//     }
//   }
// }
