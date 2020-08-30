import { GenericModel } from './../shared/generic.model';
import { Profile } from './profile.model';

export interface User extends GenericModel {
    email: string;
    password: string;
    profile: Profile;
}
