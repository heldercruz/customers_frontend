import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from './../../user.service';
import { Usuario } from '../../../auth/usuario.model';

@Component({
  selector: 'app-admin-listcustomers',
  templateUrl: './admin-listcustomers.component.html',
  styleUrls: ['./admin-listcustomers.component.css']
})
export class AdminListcustomersComponent implements OnInit {

  loading = false;
    usuarios: Usuario[];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.loading = true;
        this.userService.read().pipe(first()).subscribe(usuarios => {
            this.loading = false;
            this.usuarios = usuarios;
        });
    }

}
