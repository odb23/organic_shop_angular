import { IProduct } from 'src/app/types/IProduct';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .object('/products')
      .valueChanges()
      .pipe(
        map((data) => {
          let products: IProduct[] = [];

          data !== null &&
            Object.entries(data as Object).forEach(([key, value]) => {
              products.push({
                ...value,
                key,
              });
            });

          return products;
        })
      );
  }

  get(id: string) {
    return this.db.object('/products/' + id).valueChanges();
  }

  update(productId: string, product: Object) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
