import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.auth.appUser$
      .map(user => user.isAdmin);
  }
}
