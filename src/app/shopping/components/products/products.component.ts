
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/IProduct';
import {Subscription, switchMap } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  filteredProducts!: IProduct[];
  products: IProduct[] = [];
  productSubscription!: Subscription;
  cartSubscription!: Subscription;
  category: string = '';
  shoppingCart! : ShoppingCart;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
  
  }

  async ngOnInit(): Promise<void> {
    this.cartSubscription = (await this.cartService.getCart()).subscribe(cart => this.shoppingCart = cart)

    this.productSubscription = this.productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        let cat = params.get('category');
        if (cat !== null) {
          this.category = cat;
        } else {
          this.category = ''
        }

        this.filteredProducts =
          this.category.length !== 0
            ? this.products.filter((p) => p.category === this.category)
            : this.products;
      });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}
