import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

/*
  https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial

  The Error Interceptor intercepts http responses from the api to check if
  there were any errors. If there is a 401 Unauthorized response the user is
  automatically logged out of the application, all other errors are re-thrown up to
  the calling service so an alert with the error can be displayed on the screen.

  It's implemented using the HttpInterceptor class included in the HttpClientModule, by
  extending the HttpInterceptor class you can create a custom interceptor to catch all
  error responses from the server in a single location.

  Http interceptors are added to the request pipeline in the providers section of the app.
  module.ts file.
*/

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authService.logout();
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
