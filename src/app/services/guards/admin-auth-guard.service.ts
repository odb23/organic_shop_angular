import { IAppUser } from './../../models/app-user';
import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map((appUser) => {
        if (appUser) {
          return appUser.isAdmin;
        } else {
          return false;
        }
      })
    );
  }
}
