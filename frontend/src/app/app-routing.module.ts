import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/helpers/auth.guard';
import { AdminHomeComponent } from './admin/admin-pages/admin-home/admin-home.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { AdminNewcustomerComponent } from './admin/admin-pages/admin-newcustomer/admin-newcustomer.component';
import { AdminListcustomersComponent } from './admin/admin-pages/admin-listcustomers/admin-listcustomers.component';
import { AdminAccountComponent } from './admin/admin-pages/admin-account/admin-account.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent },
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent },
  {
    path: '',
    component: AdminHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newcustomer',
    component: AdminNewcustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listcustomers',
    component: AdminListcustomersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    component: AdminAccountComponent,
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
