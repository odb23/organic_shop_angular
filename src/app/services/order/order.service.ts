import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  async storeOrder(order: any) {
    let res = await this.db.list('/orders').push(order);
    if (res) this.cartService.clearCart();
    return res;
  }
}
