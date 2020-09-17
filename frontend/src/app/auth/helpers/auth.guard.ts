import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

/*
  https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial

  The auth guard is an angular route guard that's used to prevent unauthenticated users
  from accessing restricted routes, it does this by implementing the CanActivate
  interface which allows the guard to decide if a route can be activated with the
  canActivate() method. If the method returns true the route is activated (allowed
  to proceed), otherwise if the method returns false the route is blocked.

  The auth guard uses the authentication service to check if the user is logged in,
  if they are logged in it returns true from the canActivate() method, otherwise it
  returns false and redirects the user to the login page.

  Angular route guards are attached to routes in the router config, this auth guard is
  used in app.routing.ts to protect the home page route.
*/


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authService.currentUserValue;
      if (currentUser) {
          // logged in so return true
          return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}
