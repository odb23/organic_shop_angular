import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.default.User) {
    this.db.object('/users/'+ user.uid).update({
      name: user.displayName,
      email: user.email,
      
    })
  }
}
