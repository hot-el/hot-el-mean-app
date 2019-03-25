import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CheckOutComponent } from './check-out/check-out.component';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';
import { DeleteReservationComponent } from './delete-reservation/delete-reservation.component';
import { ReservationDetailsComponent } from './reservation-details.component';

@NgModule({
  declarations: [
    ReservationDetailsComponent,
    CheckOutComponent,
    UpdateReservationComponent,
    DeleteReservationComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    CheckOutComponent,
    UpdateReservationComponent,
    DeleteReservationComponent
  ]
})
export class ReservationDetailsModule {}