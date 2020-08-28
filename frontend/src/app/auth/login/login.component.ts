import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void { }

    loginUser(): void {
      this.authService.isAutenticated(this.user).subscribe(returnJson => {
        if (returnJson.success) {
          this.authService.setLoggedIn(true);
          this.router.navigate(['/admin']);
        } else {
           this.authService.setLoggedIn(false);
           this.authService.showMensage(returnJson.message);
        }
      });
    }
}
