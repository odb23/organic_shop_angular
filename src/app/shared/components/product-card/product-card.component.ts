import { IProduct } from 'src/app/shared/models/IProduct';
import { Component, Input} from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';

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
