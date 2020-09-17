import { GenericModel } from './../shared/generic.model';
// import { Profile } from './profile.model';


/*
  https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial

  The user model is a small class that defines the properties of a user.
*/

export interface User extends GenericModel {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token?: string;
}
