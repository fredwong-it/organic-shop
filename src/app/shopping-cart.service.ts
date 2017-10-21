import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();      // async method return promise, so we need to use the await again to get the value
    const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);

    // we use take because we don't want to unsubscribe and we only need value once in here
    item$.take(1).subscribe(item => {
      if (item.$exists()) item$.update({ quantity: item.quantity + 1 });    // update quantity
      else item$.set({ product: product, quantity: 1 });      // set quantity 1
    })
  }
}
