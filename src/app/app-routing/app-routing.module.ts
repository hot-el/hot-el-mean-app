import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { ManagerComponent } from '../manager/manager.component';
import { EmployeesComponent } from '../employees/employees.component';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { AccountDetailComponent } from '../account-detail/account-detail.component';
import { CurrentUserComponent } from '../current-user/current-user.component';
import { CalendarCommonModule } from 'angular-calendar';
import { CalendarComponent } from '../calendar/calendar.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
},
{ path: 'manager', component: ManagerComponent },
{ path: 'employees', component: EmployeesComponent },
{ path: 'detail/:id', component: EmployeeDetailComponent },
{ path: 'accounts/detail/:id', component: AccountDetailComponent },
{ path: 'your-account', component: CurrentUserComponent},
{ path: 'calendar', component: CalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
