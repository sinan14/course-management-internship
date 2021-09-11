import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}
  canActivate(): boolean {
    if (this._auth.loggedIn()) {
      Swal.fire({
        icon: 'warning',
        text: 'you are already loginned',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        this._router.navigate(['/']);
      });
      return false;
    } else {
      return true;
    }
  }
}
