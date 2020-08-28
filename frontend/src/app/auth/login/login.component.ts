import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
// import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
    profile: null
  };

 constructor(
      private router: Router,
      private authService: AuthService
      ) { }

  ngOnInit(): void { }

    loginUser(): void {
      this.authService.isAutenticated(this.user).subscribe({
        next(returnJson) {
          if (returnJson.success) {
            this.authService.setLoggedIn(true);
            this.router.navigate(['/admin']);
          } else {
            this.authService.setLoggedIn(false);
            // Inserir modal
            console.log(returnJson.message);
          }
        },
        error(msg) {
          console.log('Ocorreu um erro! tente novamente');
          // Inserir modal
          console.log('Error Getting Location: ', msg);
        }
      });
    }
}
