import { Product } from './../../models/product';
import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    // don't apply the take one here because user may open 2 screen with products list and edit product screen
    // we want to keep subscribe the changes of the getAll() observable
    // so we need to unsubscribe the observable on the ngOnDestroy
    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);     // set the filteredProducts at the first time
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    console.log(query);

    // either filter the products or display all products
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
}
