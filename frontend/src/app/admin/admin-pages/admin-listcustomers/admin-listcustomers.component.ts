import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from './../../user.service';
import { User } from '../../../auth/user.model';

@Component({
  selector: 'app-admin-listcustomers',
  templateUrl: './admin-listcustomers.component.html',
  styleUrls: ['./admin-listcustomers.component.css']
})
export class AdminListcustomersComponent implements OnInit {

  loading = false;
    users: User[];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.loading = true;
        this.userService.read().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

}
