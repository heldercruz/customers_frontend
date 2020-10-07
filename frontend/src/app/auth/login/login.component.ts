/*import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { AlertModalService } from '../../shared/alert-modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// inserir autenticação com Auth ou JWT
export class LoginComponent implements OnInit {

  form: FormGroup;

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

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      captcha: new FormControl(null, Validators.required)
    });

  }


    login(): void {

        const val = this.form.value;

        if (val.email && val.password) {
          this.authService.login(val.email, val.password)
              .subscribe(
                  () => {
                      console.log('User is logged in');
                      this.router.navigateByUrl('/');
                  }
              );
          }

    }


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
}*/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private modal: AlertModalService
  ) {
      // redirect to home if already logged in
      if (this.authService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    this.clearForm();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.clearForm();
                  this.modal.showAlertDanger(error);
              });
  }

  private clearForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberme: [''],
      captcha: ['', Validators.required]
    });
    this.loading = false;
    this.submitted = false;
  }

  public goRegister(): void {
    this.router.navigate(['/register']);
  }

  public goForgetPassword(): void {
    this.router.navigate(['/forgetpassword']);
  }
}
