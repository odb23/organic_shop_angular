import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };
  @Input('cart') cart! : ShoppingCart;
  userId = '';
  userSubscription!: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    

    this.userSubscription = this.authService.user.subscribe((u) => {
      if (!u) return;

      this.userId = u.uid;
    });
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let res = await this.orderService.storeOrder(order);

    if (res.key) {
      this.router.navigate(['/order-success', res.key]);
    }
  }

  ngOnDestroy(): void {
   
    this.userSubscription.unsubscribe();
  }
}
