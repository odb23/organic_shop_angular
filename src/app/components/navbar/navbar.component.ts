import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase  from 'firebase/compat';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  user$: Observable<firebase.default.User | null> 

  constructor(private afAuth: AngularFireAuth) { 
    this.user$ = this.afAuth.authState
  }

  logOut () {
    this.afAuth.signOut().then(() => console.log("User signed out"))
  }
}
