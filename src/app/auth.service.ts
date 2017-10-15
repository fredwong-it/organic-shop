import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    // we will use async pipe so that angular will unsubscribe the observable automatically
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';    // current route
    localStorage.setItem('returnUrl', returnUrl);     // store returnUrl to localStorage

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(() => console.log('login'));      // then didn't work, no idea why
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  // can't use the switchMap with async pipe on the template because it will create infinite loop
  // nested observable will cause async pipe a infinite loop
  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        }

        return Observable.of(null);
      });
  }
}
