import { Product } from './../../models/product';
import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];              // all items from the service
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];            // the items displayed on the data table
  itemCount: number;

  constructor(private productService: ProductService) {
    // don't apply the take one here because user may open 2 screen with products list and edit product screen
    // we want to keep subscribe the changes of the getAll() observable
    // so we need to unsubscribe the observable on the ngOnDestroy
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ limit: 10, offset: 0 })     // limit 10 records, page 1
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;    // reload will be trigger at once at the beginnig and tableResource will be null at that time

    this.tableResource.query(params)            // params passed from the component
      .then(items => this.items = items);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    console.log(query);

    // either filter the products or display all products
    const filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    // re-initialize the table after filtering
    this.initializeTable(filteredProducts);
  }
}
