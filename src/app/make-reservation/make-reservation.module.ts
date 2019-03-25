import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MakeReservationComponent } from './make-reservation.component';
import { ReserveRoomComponent } from './reserve-room/reserve-room.component';
import { NewReservationComponent } from './reserve-room/new-reservation/new-reservation.component';
import { RoomsToReserveComponent } from './rooms-to-reserve/rooms-to-reserve.component';
import { MakeReservationRoutingModule } from './make-reservation-routing.module';

@NgModule({
  declarations: [
    MakeReservationComponent,
    ReserveRoomComponent,
    NewReservationComponent,
    RoomsToReserveComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MakeReservationRoutingModule
  ],
  entryComponents: [
    NewReservationComponent
  ]
})
export class MakeReservationModule {}