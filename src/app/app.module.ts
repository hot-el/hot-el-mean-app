import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { ActiveReservationsComponent } from './active-reservations/active-reservations.component';
import { RoomsComponent } from './rooms/rooms.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { RoomModule } from './room/room.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AdminModule } from './admin/admin.module';
import { MyCalendarModule } from './calendar/calendar.module';
import { CurrentUserModule } from './current-user/current-user.module';
import { MakeReservationModule } from './make-reservation/make-reservation.module';
import { AccountDetailModule } from './account-detail/account-detail.module';
import { ReservationDetailsModule } from './reservation-details/reservation-details.module';
import { RoomDetailsModule } from './room-details/room-details.module';
import  { EmployeeDetailModule } from './employee-detail/employee-detail.module';
import { RoomCategoryModule } from './room-category/room-category.module';
import { SearchEmployeesModule } from './search-employees/search-employees.module';
import { EmployeesModule } from './employees/employees.module';
// import { ServiceModule } from './service/service.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ManagerComponent,
    RoomsComponent,
    ReceptionistComponent,
    ActiveReservationsComponent
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
    AppRoutingModule,
    CurrentUserModule,
    MakeReservationModule,
    AccountDetailModule,
    ReservationDetailsModule,
    RoomDetailsModule,
    EmployeeDetailModule,
    RoomCategoryModule,
    SearchEmployeesModule,
    EmployeesModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
