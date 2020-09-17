import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AlertModalService } from '../../shared/alert-modal.service';


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;
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
  get f() { return this.forgetPasswordForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.forgetPasswordForm.invalid) {
          return;
      }

      this.loading = true;
      /*this.authService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.clearForm();
                  this.modal.showAlertDanger(error);
              });*/
  }

  private clearForm(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      cpfCnpj: ['', Validators.required],
      email: ['', Validators.required],
      captcha: ['', Validators.required]
    });
    this.loading = false;
    this.submitted = false;
  }

  public goLogin(): void {
    this.router.navigate(['/auth']);
  }
}
