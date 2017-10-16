import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
    private router: Router) {
    this.categories$ = categoryService.getCategories();   // this is observable
  }

  ngOnInit() {
  }

  save(product) {
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
