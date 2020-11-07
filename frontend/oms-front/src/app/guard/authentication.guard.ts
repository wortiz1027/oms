import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private _loginService: LoginService,
              private router: Router) {
  }
  canActivate(): boolean {
    console.log('token: ', this._loginService.getToken());
    if (this._loginService.getToken() === '' || this._loginService.getToken() === undefined) {
      this.router.navigateByUrl('/loginOMS');
      return false;
    }
    return true;
  }

}
