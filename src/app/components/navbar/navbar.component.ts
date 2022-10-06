import { ShoppingCart } from './../../models/shopping-cart';
import { ShoppingCartService } from './../../services/shopping-cart/shopping-cart.service';
import { IAppUser } from './../../models/app-user';
import { AuthService } from './../../services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/compat';
import { Observable, Subscription } from 'rxjs';

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

  // getCartItemsQuantity() {
  //   let itemsQuantity = 0;

  //   if (!this.cart) return itemsQuantity;

  //   Object.values(this.cart.items).forEach((item: any) => {
  //     itemsQuantity += item.quantity;
  //   });

  //   return itemsQuantity
  // }

  logOut() {
    this._authService.logOut();
  }

  get authService() {
    return this._authService;
  }
}
