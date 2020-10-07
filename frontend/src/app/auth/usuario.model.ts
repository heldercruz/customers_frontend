import { Perfil } from './perfil.model';

/*
  https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial

  The user model is a small class that defines the properties of a user.
*/

export interface Usuario {
  id: number;
  username: string;
  token?: string;
  password: string;
  perfil: Perfil;
}
