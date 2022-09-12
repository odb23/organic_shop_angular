import { Component, OnInit } from '@angular/core';
import {GoogleAuthProvider} from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private afAuth: AngularFireAuth) { }

  login () {
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(() => console.log("Login Successful"))
  }

}
