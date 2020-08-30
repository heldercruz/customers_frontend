import { GenericService } from './../shared/generic.service';
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user.model';
import { ReturnJson } from '../shared/return-json';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

  isAutenticated(user: User): Observable<ReturnJson> {
    const options = this.createTokenOptions();
    options.headers = options.headers.append('Content-Type', 'application/json');
    return this.http.post<ReturnJson>( `${apiUrl}${this.serviceEndpoint}`, user).pipe(take(1));
  }
}
