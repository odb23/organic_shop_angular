import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService, private router : Router) { }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   return this.authService.user.pipe(map( user => {
      if (user) return true
      
      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}})
      return false
    }))
  }
}
