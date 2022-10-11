import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, Observable} from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

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
