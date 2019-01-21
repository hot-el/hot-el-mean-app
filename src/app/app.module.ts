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

import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { DeleteEmployeeComponent } from './employee-detail/delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './employee-detail/update-employee/update-employee.component';
import { NewAccountFormComponent } from './admin/new-account-form/new-account-form.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { DeleteAccountComponent } from './account-detail/delete-account/delete-account.component';
import { UpdateAccountFormComponent } from './account-detail/update-account-form/update-account-form.component';
import { CurrentUserComponent } from './current-user/current-user.component';
import { ChangePasswordComponent } from './current-user/change-password/change-password.component';
import { RoomModule } from './room/room.module';
import { InvoiceModule } from './invoice/invoice.module';
// import { ServiceModule } from './service/service.module';
import { RoomCategoryComponent } from './room-category/room-category.component';
import { NewRoomComponent } from './room-category/new-room/new-room.component';
import { HttpModule } from '@angular/http';
import { CategoriesService } from './_services/categories.service';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { DeleteRoomComponent } from './room-details/delete-room/delete-room.component';
import { UpdateRoomComponent } from './room-details/update-room/update-room.component';

import { MyCalendarModule } from './calendar/calendar.module';
import 'hammerjs';
import { SearchEmployeesComponent } from './search-employees/search-employees.component';
import { FilterPipe } from './search-employees/filter.pipe';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';
import { ReserveRoomComponent } from './make-reservation/reserve-room/reserve-room.component';
import { RoomsToReserveComponent } from './make-reservation/rooms-to-reserve/rooms-to-reserve.component';
import { NewReservationComponent } from './make-reservation/reserve-room/new-reservation/new-reservation.component';
import { ActiveReservationsComponent } from './active-reservations/active-reservations.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { DeleteReservationComponent } from './reservation-details/delete-reservation/delete-reservation.component';
import { UpdateReservationComponent } from './reservation-details/update-reservation/update-reservation.component';
import { CheckOutComponent } from './reservation-details/check-out/check-out.component';

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
    ChangePasswordComponent,
    RoomCategoryComponent,
    NewRoomComponent,
    RoomsComponent,
    RoomDetailsComponent,
    DeleteRoomComponent,
    UpdateRoomComponent,
    SearchEmployeesComponent,
    FilterPipe,
    ReceptionistComponent,
    MakeReservationComponent,
    ReserveRoomComponent,
    RoomsToReserveComponent,
    NewReservationComponent,
    ActiveReservationsComponent,
    ReservationDetailsComponent,
    DeleteReservationComponent,
    UpdateReservationComponent,
    CheckOutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    RouterModule,
    SharedModule,
    AuthModule,
    RoomModule,
    InvoiceModule,
    AdminModule,
    AppRoutingModule,
    MyCalendarModule,
    // ServiceModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  },
  CategoriesService
  ],
  entryComponents: [
    NewEmployeeFormComponent,
    DeleteEmployeeComponent,
    UpdateEmployeeComponent,
    NewAccountFormComponent,
    DeleteAccountComponent,
    UpdateAccountFormComponent,
    ChangePasswordComponent,
    NewRoomComponent,
    DeleteRoomComponent,
    UpdateRoomComponent,
    NewReservationComponent,
    DeleteReservationComponent,
    UpdateReservationComponent,
    CheckOutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
