import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';
import { EmployeesComponent } from './employees/employees.component';
import { NewEmployeeFormComponent } from './employees/new-employee-form/new-employee-form.component';

import {MaterialModule} from './material-module/material.module';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { DeleteEmployeeComponent } from './employee-detail/delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './employee-detail/update-employee/update-employee.component';
import { NewAccountFormComponent } from './admin/new-account-form/new-account-form.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { DeleteAccountComponent } from './account-detail/delete-account/delete-account.component';
import { UpdateAccountFormComponent } from './account-detail/update-account-form/update-account-form.component';
import { CurrentUserComponent } from './current-user/current-user.component';
import { ChangePasswordComponent } from './current-user/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ManagerComponent,
    EmployeesComponent,
    NewEmployeeFormComponent,
    EmployeeDetailComponent,
    DeleteEmployeeComponent,
    UpdateEmployeeComponent,
    AccountDetailComponent,
    DeleteAccountComponent,
    UpdateAccountFormComponent,
    CurrentUserComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  }],
  entryComponents: [
    NewEmployeeFormComponent,
    DeleteEmployeeComponent,
    UpdateEmployeeComponent,
    NewAccountFormComponent,
    DeleteAccountComponent,
    UpdateAccountFormComponent,
    ChangePasswordComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
