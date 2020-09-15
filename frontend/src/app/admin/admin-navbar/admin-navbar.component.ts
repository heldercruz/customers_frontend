import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'newcustomer', title: 'New Customer',  icon: 'fa-user-plus', class: '' },
  { path: 'listcustomers', title: 'List Customers',  icon: 'fa-users', class: '' }
];

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  currentUser: User;
  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
