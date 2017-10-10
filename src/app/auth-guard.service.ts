import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    // transform the Observable<firebase.User> to Observable<boolean>
    return this.auth.user$.map(user => {
      if (user) {
        return true;
      } else {
        // navigate to login page
        // state allow us to get the url when the AuthGuard kick in
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    });
  }
}
