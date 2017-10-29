import { OrderService } from '../order.service';
import { Subscription } from 'rxjs/Rx';
import { Subscribable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  userId: string;
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    const cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    console.log(this.shipping);

    const order = {
      userId: this.userId,
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
