import { OrderService } from '../order.service';
import { Subscription } from 'rxjs/Rx';
import { Subscribable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService) {
  }

  async ngOnInit() {
    const cart$ = await this.cartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  placeOrder() {
    console.log(this.shipping);

    const order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      // map to the order items from shopping-cart item
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        };
      })
    };

    this.orderService.storeOrder(order);
  }
}
