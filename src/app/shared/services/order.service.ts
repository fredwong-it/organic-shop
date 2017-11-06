import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  async placeOrder(order) {
    // store order
    const result = await this.db.list('/orders').push(order);

    // clear the shopping cart whenever we place an order
    this.cartService.clearCart();

    return result;
  }
}
