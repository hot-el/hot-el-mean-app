import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { ManagerComponent } from '../manager/manager.component';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { AccountDetailComponent } from '../account-detail/account-detail.component';
import { CurrentUserComponent } from '../current-user/current-user.component';
import { RoomDetailsComponent } from '../room-details/room-details.component';
import { ReceptionistComponent } from '../receptionist/receptionist.component';
import { ReserveRoomComponent } from '../make-reservation/reserve-room/reserve-room.component';
import { ReservationDetailsComponent } from '../reservation-details/reservation-details.component';
import { OccupiedDetailsComponent } from '../currenlty-occupied/occupied-details/occupied-details.component'; 
import { SearchFreeRoomsComponent } from '../search-free-rooms/search-free-rooms.component';

import { MakeReservationRoutingModule } from '../make-reservation/make-reservation-routing.module';
import { ManagerRoutingModule } from '../manager/manager-routing.module';
import { ReceptionistRoutingModule } from '../receptionist/receptionist-routing.module';
import { RoomCategoryRoutingModule } from '../room-category/room-category-routing.module';

import { BuildingPlanComponent } from '../building-plan/building-plan/building-plan.component';

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
{ path: 'detail/:id', component: EmployeeDetailComponent },
{ path: 'accounts/detail/:id', component: AccountDetailComponent },
{ path: 'your-account', component: CurrentUserComponent},
{ path: 'room-details/:id', component: RoomDetailsComponent },
{ path: 'receptionist', component: ReceptionistComponent },
{ path: 'reservation-details/:room_id/:reservation_id', component: ReservationDetailsComponent },
{ path: 'new-reservation/:id/:from/:to', component: ReserveRoomComponent },
{ path: 'occupied-details/:room_id/:reservation_id', component: OccupiedDetailsComponent },
{ path: 'make-reservation', component: SearchFreeRoomsComponent },
{
  path: 'room',
  loadChildren: 'app/room/room.module#RoomModule'
}, {
  path: 'invoice',
  loadChildren: 'app/invoice/invoice.module#InvoiceModule'
}, {
  path: 'service',
  loadChildren: 'app/service/service.module#ServiceModule'
}, {
  path: 'building-plan',
  loadChildren: 'app/building-plan/building-plan.module#BuildingPlanModule'
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MakeReservationRoutingModule,
    ManagerRoutingModule,
    ReceptionistRoutingModule,
    RoomCategoryRoutingModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
