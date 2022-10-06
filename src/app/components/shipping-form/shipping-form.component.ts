import { Router } from '@angular/router';
import { IAppUser } from 'src/app/models/app-user';
import { AuthService } from './../../services/auth/auth.service';
import { OrderService } from './../../services/order/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order';

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
  cart!: ShoppingCart;
  userId = '';
  cartSubscription!: Subscription;
  userSubscription!: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));

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
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
