import { GenericService } from './../shared/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '@environments/environment';

/*
  https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial

  The authentication service is used to login & logout of the Angular app, it notifies
  other components when the user logs in & out, and allows access the currently logged
  in user.

  RxJS Subjects and Observables are used to store the current user object and notify
  other components when the user logs in and out of the app. Angular components can
  subscribe() to the public currentUser: Observable property to be notified of changes,
  and notifications are sent when the this.currentUserSubject.next() method is called
  in the login() and logout() methods, passing the argument to each subscriber. The
  RxJS BehaviorSubject is a special type of Subject that keeps hold of the current
  value and emits it to any new subscribers as soon as they subscribe, while regular
  Subjects don't store the current value and only emit values that are published after
  a subscription is created. For more info on communicating between components with RxJS
  Observables see this post.

  The login() method sends the user credentials to the API via an HTTP POST request for
  authentication. If successful the user object including a JWT auth token are stored in
  localStorage to keep the user logged in between page refreshes. The user object is then
  published to all subscribers with the call to this.currentUserSubject.next(user);.

  The constructor() of the service initialises the currentUserSubject with the
  currentUser object from localStorage which enables the user to stay logged in between
  page refreshes or after the browser is closed. The public currentUser property is then
  set to this.currentUserSubject.asObservable(); which allows other components to
  subscribe to the currentUser Observable but doesn't allow them to publish to the
  currentUserSubject, this is so logging in and out of the app can only be done via
  the authentication service.

  The currentUserValue getter allows other components an easy way to get the value of the
  currently logged in user without having to subscribe to the currentUser Observable.

  The logout() method removes the current user object from local storage and publishes
  null to the currentUserSubject to notify all subscribers that the user has logged out.
*/

@Injectable({ providedIn: 'root' })
export class AuthService extends GenericService<User>{

  constructor(http: HttpClient) {
    super(http, 'authenticate');
    super.createToken();
  }

  public login(username: string, password: string): any {
    console.log('login test');
    // return this.http.post<any>(`http://localhost:8080/authenticate`, { username, password })
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, { username, password })
        .pipe(map(user => {
          super.initToken(user);
          console.log(user);
        }));
  }

  public logout(): void {
      super.clearToken();
  }
}
