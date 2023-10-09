import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories$: any;
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = this.categoryService.getCategories();
  }
  save(product: any) {
    console.log('product', product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
