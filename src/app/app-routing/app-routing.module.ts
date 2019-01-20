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
import { RoomCategoryComponent } from '../room-category/room-category.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { RoomDetailsComponent } from '../room-details/room-details.component';
import { ReceptionistComponent } from '../receptionist/receptionist.component';
import { MakeReservationComponent } from '../make-reservation/make-reservation.component';
import { RoomsToReserveComponent } from '../make-reservation/rooms-to-reserve/rooms-to-reserve.component';
import { ReserveRoomComponent } from '../make-reservation/reserve-room/reserve-room.component';
import { ActiveReservationsComponent } from '../active-reservations/active-reservations.component';
import { ReservationDetailsComponent } from '../reservation-details/reservation-details.component';

export const routes: Routes = [{
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
{ path: 'calendar', component: CalendarComponent },
{ path: 'room-categories', component: RoomCategoryComponent },
{ path: 'rooms/:categorySlug/:size', component: RoomsComponent },
{ path: 'room-details/:id', component: RoomDetailsComponent },
{ path: 'receptionist', component: ReceptionistComponent },
{ path: 'reservation', component: MakeReservationComponent },
{ path: 'active-reservations', component: ActiveReservationsComponent },
{ path: 'reservation-details/:id', component: ReservationDetailsComponent },
{ path: 'rooms-to-reserve/:categorySlug/:size', component: RoomsToReserveComponent},
{ path: 'new-reservation/:id', component: ReserveRoomComponent },
{
  path: 'room',
  loadChildren: 'app/room/room.module#RoomModule'
}, {
  path: 'invoice',
  loadChildren: 'app/invoice/invoice.module#InvoiceModule'
}, {
  path: 'service',
  loadChildren: 'app/service/service.module#ServiceModule'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
