import { GenericService } from './../shared/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../auth/usuario.model';

@Injectable({ providedIn: 'root' })
export class UserService extends GenericService<Usuario>{
  constructor(http: HttpClient) {
    super(http, 'usuario');
  }
}
