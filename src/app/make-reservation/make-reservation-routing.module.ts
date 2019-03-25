import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeReservationComponent } from './make-reservation.component';
import { RoomsToReserveComponent } from './rooms-to-reserve/rooms-to-reserve.component';


const routes: Routes = [
    { path: 'rooms-to-reserve/:categorySlug/:size', component: RoomsToReserveComponent }, 
    { path: 'reservation', component: MakeReservationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MakeReservationRoutingModule {}
