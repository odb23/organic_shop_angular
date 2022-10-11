import { Observable, switchMap } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  orders$: Observable<Order[] | null>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.orders$ = authService.user.pipe(
      switchMap((u) => {
        if (u === null) return new Observable<null>();
        return orderService.getOrdersByUserId(u.uid);
      })
    );
  }
}
