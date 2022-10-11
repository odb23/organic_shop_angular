
import { Component, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { IAppUser } from 'src/app/shared/models/app-user';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser!: IAppUser | null;
  cart!: ShoppingCart;
  cartSubscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private cartService: ShoppingCartService
  ) {
    this._authService.appUser$.subscribe((user) => (this.appUser = user));
  }

  async ngOnInit(): Promise<void> {
    this.cartSubscription = (await this.cartService.getCart()).subscribe(
      (cart) => {
        this.cart = cart;
      }
    );
  }

  logOut() {
    this._authService.logOut();
  }

  get authService() {
    return this._authService;
  }
}
