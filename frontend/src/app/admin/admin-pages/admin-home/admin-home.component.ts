import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../../auth/user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {
    loading = false;
    users: User[];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}
