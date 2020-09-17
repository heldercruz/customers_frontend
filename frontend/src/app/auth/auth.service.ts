import { GenericService } from './../shared/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthService extends GenericService<User>{

  constructor(http: HttpClient) {
    super(http, 'login');
    super.createToken();
  }

  public login(username: string, password: string): any {
    return this.http.post<User>(`${environment.apiUrl}/login`, { username, password })
        .pipe(map(user => {
          super.initToken(user);
        }));
  }

  public logout(): void {
      super.clearToken();
  }
}
