import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { ReturnJson } from '../shared/return-json';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../auth/user.model';

/*
  The "Generic Service" is a class created to provide a default service
  to make easily to create a services for eath object that need
*/
export class GenericService<T> {
  constructor(protected http: HttpClient, private serviceEndpoint) {}

  protected currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  protected createToken(): void {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(null)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // store user details and jwt token in local storage to keep user logged in between page refreshes
  protected initToken(user: User): void {
    localStorage.setItem(user.token, JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  protected clearToken(): void {
     // remove user from local storage to log user out
     localStorage.removeItem(null);
     this.currentUserSubject.next(null);
     this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  protected createTokenOptions(): any {
    return {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem(null)}`)};
  }

  public create(record: T): Observable<ReturnJson> {
    const options = this.createTokenOptions();
    options.headers = options.headers.append('Content-Type', 'application/json');
    return this.http.post<ReturnJson>( `${environment.apiUrl}/${this.serviceEndpoint}`, record).pipe(take(1), options);
  }

  public remove(id: number): Observable<ReturnJson> {
    return this.http.delete<ReturnJson>(
      `${environment.apiUrl}/${this.serviceEndpoint}/${id}`).pipe(take(1), this.createTokenOptions());
  }

  public update(record: T): Observable<ReturnJson> {
    return this.http.put<ReturnJson>(`${environment.apiUrl}/${this.serviceEndpoint}/${record['id']}`, record).pipe(
           take(1), this.createTokenOptions());
  }

  public read(id?: number): Observable<any>{
    let url = `${environment.apiUrl}/${this.serviceEndpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.get<any>(url);
  }
}
