import { Profile } from './profile.model';

export interface User {
    email: string;
    password: string;
    profile: Profile;
}
