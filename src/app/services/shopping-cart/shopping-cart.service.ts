import { ShoppingCart } from './../../models/shopping-cart';
import { IProduct } from 'src/app/models/IProduct';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async addToCart(product: IProduct) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: IProduct) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/' + cartId + '/items/').remove()
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();

    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((x: any) => {
          if (!x) return new ShoppingCart({});
          return new ShoppingCart(x.items);
        })
      );
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getCartItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = await this.create();
    if (!result.key) return;

    localStorage.setItem('cartId', result.key);

    return result.key;
  }

  private async updateItemQuantity(product: IProduct, change: number) {
    let cartId = await this.getOrCreateCartId();
    if (!cartId) return;

    let item$ = this.getCartItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        let quantity = (item?.quantity ?? 0) + change;
        if (quantity <= 0) item$.remove();
        else
          item$.update({
            product,
            quantity,
          });
      });
  }
}
