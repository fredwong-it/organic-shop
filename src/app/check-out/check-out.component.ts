import { OrderService } from '../order.service';
import { Subscription } from 'rxjs/Rx';
import { Subscribable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

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
    private router: Router,
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

  async placeOrder() {
    //console.log(this.shipping);
    const order = new Order(this.userId, this.shipping, this.cart);

    // storeOrder return a promise, either use then or await to get the result
    const result = await this.orderService.storeOrder(order);

    // $key - read a node from firebase
    // key - when you store something in firebase, firebase returns these newly generated ID in this key property
    this.router.navigate(['/order-success', result.key]);
  }
}
