import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { AlertModalService } from '../../../shared/alert-modal.service';

@Component({
  selector: 'app-admin-newcustomer',
  templateUrl: './admin-newcustomer.component.html',
  styleUrls: ['./admin-newcustomer.component.css']
})
export class AdminNewcustomerComponent implements OnInit {
  customerForm: FormGroup;
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

      if (!this.authService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    this.clearForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.customerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.customerForm.invalid) {
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
    this.customerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberme: [''],
      captcha: ['', Validators.required]
    });
    this.loading = false;
    this.submitted = false;
  }

}
