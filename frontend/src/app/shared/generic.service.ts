import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { ReturnJson } from '../shared/return-json';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.serverBaseUrl;
const apiEndpoint = environment.apiEndpoint;
const apiUrl = `${baseUrl}${apiEndpoint}`;

/*
  The "Generic Service" is a class created to provide a default service
  to make easily to create a services for eath object that need
*/
export class GenericService<T> {
  constructor(public http: HttpClient, protected serviceEndpoint) {}


  protected createTokenOptions(): any {
    return {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)};
  }

  public create(record: T): Observable<ReturnJson> {
    const options = this.createTokenOptions();
    options.headers = options.headers.append('Content-Type', 'application/json');
    return this.http.post<ReturnJson>( `${apiUrl}${this.serviceEndpoint}`, record).pipe(take(1), options);
  }

  public remove(id: number): Observable<ReturnJson> {
    return this.http.delete<ReturnJson>(
      `${apiUrl}${this.serviceEndpoint}/${id}`).pipe(take(1), this.createTokenOptions());
  }

  public update(record: T): Observable<ReturnJson> {
    return this.http.put<ReturnJson>(`${apiUrl}${this.serviceEndpoint}/${record['id']}`, record).pipe(
           take(1), this.createTokenOptions());
  }

  public read<T>(id?: number): Observable<T>{
    let url = `${apiUrl}${this.serviceEndpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.get<T>(url).pipe(take(1), this.createTokenOptions());
  }
}
