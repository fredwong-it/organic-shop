import { ShoppingCart } from '../shared/models/shopping-cart';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../shared/models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    // only 1 instance for this component in the application so there won't be a memory leak
    // no need to unsubscribe this observable
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();      // use async pipe to get the totalItemsCount
  }

  logout() {
    this.auth.logout();
  }
}
