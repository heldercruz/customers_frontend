import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { User } from './user.model';
import { ReturnJson } from '../util/return-json';
import { map, retry, catchError } from 'rxjs/operators';
import { Observable, throwError, EMPTY } from 'rxjs';
// import { BootstrapAlertService, BootstrapAlert } from 'ngx-bootstrap-alert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    public returnJson: ReturnJson;
    // private bootstrapAlertService: BootstrapAlertService;

    public LoggerInStatus = true;

    urlApi = 'http://localhost:8080/login';
  /*
    // Headers
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  */

    constructor(
       private http: HttpClient
    ) { }

/*
    this.snackbarService.add({
      msg: '<strong>Message sent.</strong>',
      timeout: 5000,
      action: {
        text: 'Undo',
        onClick: (snack) => {
          console.log('dismissed: ' + snack.id);

          _this.undo();
        },
      },*/
    showMensage(msg: string, isError: boolean = false): void {
      /*this.snackBar.add({
        msg: msgReturn,
        timeout: 3000/
      });*/
      /*this.alertService({
           message: msg,
           timeoutInMilliseconds: 3000,
           type: isError ? ['alert-danger'] : ['alert-success']
       });*/
/*
      const bootstrapAlert = new BootstrapAlert('Default', 'alert-info');
      bootstrapAlert.message = msg;
      bootstrapAlert.type = isError ? 'alert-danger' : 'alert-success';
      bootstrapAlert.timeoutInMiliSeconds = 3000;
      this.bootstrapAlertService.alert(bootstrapAlert);
*/

      /*this.snackBar.open(msg, 'x', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: isError ? ['msg-error'] : ['msg-success']
      });*/
    }

    erroHandler(e: any): Observable<any>{
      this.showMensage('Ocorreu um erro! tente novamente', true);
      return EMPTY;
    }


      setLoggedIn(value: boolean): void{
        this.LoggerInStatus = value;
      }

      get isLoogedIn(): boolean{
        return this.LoggerInStatus;
      }

      isAutenticated(user: User): Observable<ReturnJson> {
        return this.http.post<ReturnJson>(this.urlApi, user).pipe(
          map(obj => obj),
          catchError(e => this.erroHandler(e))
        );
      }

}
