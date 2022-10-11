
import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/models/IProduct';
import { ProductService } from 'src/app/shared/services/product/product.service';

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
      this.filteredProducts = this.products = products;
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
