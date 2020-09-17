import { GenericService } from './../shared/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends GenericService<User>{
  constructor(http: HttpClient) {
    super(http, 'login');
  }
}
