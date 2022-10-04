import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db
      .object('/categories')
      .valueChanges()
      .pipe(
        map((data) => {
          let categrories: any[] = [];

          data !== null &&
            Object.entries(data as Object).forEach(([key, value]) => {
              categrories.push({
                key,
                ...value,
              });
            });

          return categrories;
        })
      );
  }
}
