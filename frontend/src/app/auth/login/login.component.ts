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



  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void { }
/*
  loginUser(event): void {
    event.preventDefault();
    const target = event.target;
    const email = target.getElementById('inputEmail').value;
    const password = target.getElementById('inputPassword').value;

    window.alert(email);
    console.log(email, password);
*/
    loginUser(): void {
      this.authService.isAutenticated(this.user).subscribe(returnJson => {
        if (returnJson.success) {
          this.router.navigate(['/admin']);
        } else {
           this.authService.showMensage(returnJson.message);
        }
      });
    }
}
