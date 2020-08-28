import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user.model';
import { ReturnJson } from '../util/return-json';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    public returnJson: ReturnJson;

    public LoggerInStatus = true;

    urlApi = 'http://localhost:8080/login';

    constructor(private http: HttpClient) { }

     // Headers
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      setLoggedIn(value: boolean): void{
        this.LoggerInStatus = value;
      }

      get isLoogedIn(): boolean{
        return this.LoggerInStatus;
      }

      isAutenticated(user: User): Observable<ReturnJson> {
        return this.http.post<ReturnJson>(this.urlApi, user).pipe(
          map(obj => obj)
        );
      }

}
