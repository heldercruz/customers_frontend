import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { WebsiteHomeComponent } from './website/website-component/website-home/website-home.component';

import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AdminHomeComponent } from './admin/admin-component/admin-home/admin-home.component';


const routes: Routes = [
  {
    path: '',
    component: WebsiteHomeComponent
  },
  {
    path: 'auth',
    component: LoginComponent },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
