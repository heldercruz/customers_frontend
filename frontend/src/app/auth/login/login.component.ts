import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { AlertModalService } from '../../shared/alert-modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// inserir autenticação com Auth ou JWT
export class LoginComponent implements OnInit {

  user: User = {
    id: 0,
    email: '',
    password: '',
    profile: null
  };

 constructor(
      private router: Router,
      private authService: AuthService,
      private modal: AlertModalService
      ) { }

  ngOnInit(): void { }

    loginUser(): void {
      this.authService.isAutenticated(this.user).subscribe(
        returnJson => {
          if (returnJson.success) {
            this.authService.setLoggedIn(true);
            this.router.navigate(['/admin']);
          } else {
            this.authService.setLoggedIn(false);
            this.modal.showAlertDanger(returnJson.message);
            console.log(returnJson.message);
          }
        },
        err => {
          this.modal.showAlertDanger('Ocorreu um erro! tente novamente');
          console.log('Error Getting Location: ', err);
        }
      );
    }
}
