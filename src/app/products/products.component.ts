import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  categories$;
  products: Product[] = [];
  filteredProducts: Product[];
  subscription: Subscription;
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
    this.subscription = productService.getAll()
      .subscribe(products => this.products = products);

    // can't use snapshot because the component won't be destroy when user choose different category
    // it needs to subscribe the category observable to display different category route
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
