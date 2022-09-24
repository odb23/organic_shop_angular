import { UserService } from './../user/user.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, switchMap } from 'rxjs';
import { IAppUser } from 'src/app/models/app-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user$: Observable<firebase.default.User | null>;


  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this._user$ = this.afAuth.authState;
  }

  logIn() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(() => {
      console.log('Login Successful');
      this.router.navigateByUrl(returnUrl);
    });
  }

  logOut() {
    this.afAuth.signOut().then(() => console.log('User signed out'));
  }

  get user() {
    return this._user$;
  }

  get appUser$(): Observable<IAppUser | null> {
    return this.user.pipe(
      switchMap((user) => this.userService.get(user?.uid))
    );
  }
}
