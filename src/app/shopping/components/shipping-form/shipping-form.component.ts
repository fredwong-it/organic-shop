import { Subscription } from 'rxjs/Rx';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userId: string;
  subscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    //console.log(this.shipping);
    const order = new Order(this.userId, this.shipping, this.cart);

    // storeOrder return a promise, either use then or await to get the result
    const result = await this.orderService.placeOrder(order);

    // $key - read a node from firebase
    // key - when you store something in firebase, firebase returns these newly generated ID in this key property
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
