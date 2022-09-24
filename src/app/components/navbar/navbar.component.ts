import { IAppUser } from './../../models/app-user';
import { AuthService } from './../../services/auth/auth.service';
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
  appUser!: IAppUser | null;

  constructor(private _authService : AuthService) { 
    this._authService.appUser$.subscribe((user) => this.appUser = user )
  }

  logOut () {
    this._authService.logOut()
  }

  get authService () {
    return this._authService
  }
}
