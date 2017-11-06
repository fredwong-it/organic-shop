import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    // get rid of the nested if
    // subscribe to identify login and logout
    auth.user$.subscribe(user => {
      if (!user) return;        // the user will be null when logout

      userService.save(user);

      // this should only happen once as part of our authentication process
      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');       // remove the returnUrl after we use it once
      router.navigateByUrl(returnUrl);
    });
  }
}
