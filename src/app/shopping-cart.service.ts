import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  // the return type is Promise because of the async keyword
  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();

    // map from a firebase object to ShoppingCart object and it become Observable
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => {
        return new ShoppingCart(x.items);
      });
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();      // async method return promise, so we need to use the await again to get the value
    const item$ = this.getItem(cartId, product.$key);

    // we use take because we don't want to unsubscribe and we only need value once in here
    item$.take(1).subscribe(item => {
      const quantity = (item.quantity || 0) + change;   // use item.quantity or 0 if item.quantity is undefined

      if (quantity === 0) {
        item$.remove();   // item FirebaseObjectObservable
      } else {
        // new structure for the shopping cart item
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }
    });
  }
}
