import { ProductService } from './../../../services/product/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { IProduct } from 'src/app/types/IProduct';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: IProduct[];
  filteredProducts!: IProduct[];
  sub!: Subscription;

  constructor(private productService: ProductService) {
    this.sub = productService.getAll().subscribe((products) => {
      let productsData: IProduct[] = [];

      products !== null &&
        Object.entries(products).forEach(([key, value]) => {
          productsData.push({
            key,
            ...value,
          });
        });

      this.filteredProducts = this.products = productsData;
    });
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
