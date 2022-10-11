import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart!: ShoppingCart;
  cartSubscription!: Subscription;
  
  constructor(
    private cartService: ShoppingCartService) { }
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));
  }

}
