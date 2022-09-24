import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { IAppUser } from 'src/app/models/app-user';
import { DatabaseReference } from '@angular/fire/compat/database/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private db: AngularFireDatabase) {
  
  }

  save(user: firebase.default.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  get(uid: string | undefined) {
    return this.db.object<IAppUser>('/users/' + uid).valueChanges();
  }
}
