import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../user.model';



const users: User[] = [{
  id: 1,
  username: 'springuser',
  password: 'password',
  profileId: null,
}];

const token = 'fake-jwt-token';


/*
  https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial

  In order to run and test the Angular application without a real backend API, the
  example uses a fake backend that intercepts the HTTP requests from the Angular app
  and send back "fake" responses. This is done by a class that implements the Angular
  HttpInterceptor interface, for more information on Angular HTTP Interceptors see
  https://angular.io/api/common/http/HttpInterceptor or this article.

  The fake backend contains a handleRoute function that checks if the request matches
  one of the faked routes in the switch statement, at the moment this includes POST
  requests to the /users/authenticate route for handling authentication, and GET
  requests to the /users route for getting all users.

  Requests to the authenticate route are handled by the authenticate() function which
  checks the username and password against an array of hardcoded users. If the username
  and password are correct then an ok response is returned with the user details and a
  fake jwt token, otherwise an error response is returned.

  Requests to the get users route are handled by the getUsers() function which checks
  if the user is logged in by calling the new isLoggedIn() helper function. If the user
  is logged in an ok() response with the whole users array is returned, otherwise a 401
  Unauthorized response is returned by calling the new unauthorized() helper function.

  If the request doesn't match any of the faked routes it is passed through as a real
  HTTP request to the backend API.
*/

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
        .pipe(mergeMap(handleRoute))
        .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(delay(500))
        .pipe(dematerialize());

    function handleRoute() {
        switch (true) {
            case url.endsWith('/authenticate') && method === 'POST':
                return authenticate();
            case url.endsWith('/user') && method === 'GET':
                return getUsers();
            default:
                // pass through any requests not handled above
                return next.handle(request);
        }
    }

    // route functions

    function authenticate() {
        const currentuser = users.find(x => x.username === body.username && x.password === body.password);
        if (!currentuser) return error('Username or password is incorrect');

        currentuser.password = null;
        currentuser.token = token;

        return ok(currentuser);
    }

    function getUsers() {
        if (!isLoggedIn()) return unauthorized();
        return ok(users);
    }

    // helper functions

    function ok(body?) {
        return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
        return throwError({ error: { message } });
    }

    function unauthorized() {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
        return headers.get('Authorization') === 'Bearer ' + token;
    }
}
}

export let fakeBackendProvider = {
// use fake backend in place of Http service for backend-less development
provide: HTTP_INTERCEPTORS,
useClass: FakeBackendInterceptor,
multi: true
};
