
import { Component, Input} from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product!: IProduct;
  @Input('shopping-cart') shoppingCart!: any;


  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product)
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    return this.shoppingCart.getQuantity(this.product.key) 
  }

}
