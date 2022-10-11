import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { map } from 'rxjs';
import { Order } from 'src/app/shared/models/order';

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

   getOrders() {
    return this.db
      .object('/orders')
      .valueChanges()
      .pipe(
        map((data) => {
          let orders: Order[] = [];

          data !== null &&
            Object.entries(data as Object).forEach(([key, value]) => {
              orders.push({
                ...value,
                key,
              });
            });

          return orders;
        })
      );
  }

  getOrdersByUserId (userId: string) {
    return this.db
    .list<Order>('/orders', ref => ref.orderByChild('userId').equalTo(userId))
    .valueChanges()
  }
}
