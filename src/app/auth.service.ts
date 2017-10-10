import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
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
}
