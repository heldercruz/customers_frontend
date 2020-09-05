import { GenericModel } from './../shared/generic.model';
// import { Profile } from './profile.model';

export interface User extends GenericModel {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token?: string;
}
