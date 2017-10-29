import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();    // get shopping cart
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
      // switch from getAll observable to queryParamMap observable
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      // can't use snapshot because the component won't be destroy when user choose different category
      // it needs to subscribe the category observable to display different category route
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
