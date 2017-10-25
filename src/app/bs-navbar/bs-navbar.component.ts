import { ShoppingCartService } from '../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    // only 1 instance for this component in the application so there won't be a memory leak
    // no need to unsubscribe this observable
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    const cart$ = await this.cartService.getCart();
    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;

      // calculate the shoppingCartItemCount
      for (const productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
