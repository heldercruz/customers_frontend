import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

/*
  https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial

  The JWT Interceptor intercepts http requests from the application to add a JWT auth
  token to the Authorization header if the user is logged in.

  It's implemented using the HttpInterceptor class included in the HttpClientModule, by
  extending the HttpInterceptor class you can create a custom interceptor to modify http
  requests before they get sent to the server.

  Http interceptors are added to the request pipeline in the providers section of the
  app.module.ts file.
*/

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
