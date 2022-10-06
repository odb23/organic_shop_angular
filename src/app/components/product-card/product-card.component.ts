import { ShoppingCart } from './../../models/shopping-cart';
import { ShoppingCartService } from './../../services/shopping-cart/shopping-cart.service';
import { IProduct } from 'src/app/models/IProduct';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product!: IProduct;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart!: any;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }


  getQuantity() {
    if (!this.shoppingCart) return 0;
    return this.shoppingCart.getQuantity(this.product.key) 
  }
}
