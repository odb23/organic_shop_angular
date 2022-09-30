import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../services/product/product.service';
import { CategoryService } from './../../../services/category/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$: Observable<any[]>;
  product: any = {
    title: '',
    price: 0,
    category: '',
    imageUrl: '',
  };
  private sub!: Subscription;
  private id: string | null;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories().valueChanges();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.sub = this.productService.get(this.id).subscribe((p) => {
        this.product = p;
        console.log(this.product);
      });
    console.log(this.product);
  }

  ngOnInit(): void {}

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.id &&
        this.productService.delete(this.id).then((val) => {
          this.router.navigate(['/admin/products']);
        });
    }
  }

  saveProduct(form: NgForm) {
    if (this.id) {
      this.updateProduct(this.id, form);
    } else {
      this.createProduct(form);
    }
  }

  private updateProduct(id: string, form: NgForm) {
    console.log(form);
    this.productService
      .update(id, form.value)
      .then((val) => {
        form.resetForm();
        this.router.navigate(['/admin/products']);
      })
      .catch((err) => console.log(err));
  }

  private createProduct(form: NgForm) {
    this.productService
      .create(form.value)
      .then((val) => {
        form.resetForm();
        this.router.navigate(['/admin/products']);
      })
      .catch((err) => console.log(err));
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
