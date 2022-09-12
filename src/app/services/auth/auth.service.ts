import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user$:  Observable<firebase.default.User | null> 

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
    this._user$ = this.afAuth.authState
  }

  logIn() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/"
    localStorage.setItem("returnUrl", returnUrl)

    this.afAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then(() => {
        console.log('Login Successful')
        this.router.navigateByUrl(returnUrl);
      });
    
  }

  logOut() {
     this.afAuth.signOut().then(() => console.log('User signed out'));
  }

  get user () {
    return this._user$;
  }
}
