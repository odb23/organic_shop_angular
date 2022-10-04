import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../services/category/category.service';
import { IProduct } from 'src/app/types/IProduct';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  categories$!: Observable<any[]>;
  filteredProducts!: IProduct[];
  products: IProduct[] = [];
  subscription!: Subscription;
  category: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.productService
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

    this.categories$ = this.categoryService.getAll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
