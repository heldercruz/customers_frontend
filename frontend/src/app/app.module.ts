// Default imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ngx-bootstrap imports
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

// for dont refresh form
import { FormsModule } from '@angular/forms';

// To validated form
import { ReactiveFormsModule } from '@angular/forms';

// for working on service conetion to API
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

// for access rout /admin just with login on
import { AuthGuard } from './auth/helpers/auth.guard';
import { ErrorInterceptor } from './auth/helpers/error.interceptor';
import { JwtInterceptor } from './auth/helpers/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './auth/helpers/fake-backend';


// To use captcha
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';


// components imports
import { WebsiteHeaderComponent } from './website/website-template/website-header/website-header.component';
import { WebsiteFooterComponent } from './website/website-template/website-footer/website-footer.component';
import { WebsiteHomeComponent } from './website/website-component/website-home/website-home.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminFooterComponent } from './admin/admin-template/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './admin/admin-template/admin-header/admin-header.component';
import { AdminHomeComponent } from './admin/admin-component/admin-home/admin-home.component';



@NgModule({
  declarations: [
    AppComponent,
    WebsiteHeaderComponent,
    WebsiteFooterComponent,
    WebsiteHomeComponent,
    LoginComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    BsModalRef,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
