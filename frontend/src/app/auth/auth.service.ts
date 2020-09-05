/*import { GenericService } from './../shared/generic.service';
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user.model';
import { ReturnJson } from '../shared/return-json';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

const baseUrl = environment.serverBaseUrl;
const apiEndpoint = environment.apiEndpoint;
const apiUrl = `${baseUrl}${apiEndpoint}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService extends GenericService<User>{

  public LoggerInStatus = false;

  constructor(public http: HttpClient) {
    super(http, 'login');
  }

  public setLoggedIn(value: boolean): void{
    this.LoggerInStatus = value;
  }

  public isLoogedIn(): boolean{
    return this.LoggerInStatus;
  }

  public login(email: string, password: string ) {
    return this.http.post<User>(`${apiUrl}${this.serviceEndpoint}`, {email, password})
        // this is just the HTTP call,
        // we still need to handle the reception of the token
        .shareReplay();
  }

  public isAutenticated(user: User): Observable<ReturnJson> {
    const options = this.createTokenOptions();
    options.headers = options.headers.append('Content-Type', 'application/json');
    return this.http.post<ReturnJson>( `${apiUrl}${this.serviceEndpoint}`, user).pipe(take(1));
  }


  public login(email: string, password: string ): void {
    return this.http.post<User>('/api/login', {email, password})
        .do(res => this.setSession)
        .shareReplay();
  }

  private setSession(authResult): void {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  public logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  public getExpiration(): any {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }


}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '@environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
