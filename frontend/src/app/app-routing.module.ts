import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/helpers/auth.guard';
import { AdminHomeComponent } from './admin/admin-component/admin-home/admin-home.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent },
  {
    path: '',
    component: AdminHomeComponent,
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
