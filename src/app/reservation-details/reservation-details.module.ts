import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';
import { DeleteReservationComponent } from './delete-reservation/delete-reservation.component';
import { ReservationDetailsComponent } from './reservation-details.component';
import { CheckInComponent } from './check-in/check-in.component';

@NgModule({
  declarations: [
    ReservationDetailsComponent,
    UpdateReservationComponent,
    DeleteReservationComponent,
    CheckInComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    UpdateReservationComponent,
    DeleteReservationComponent,
    CheckInComponent
  ]
})
export class ReservationDetailsModule {}