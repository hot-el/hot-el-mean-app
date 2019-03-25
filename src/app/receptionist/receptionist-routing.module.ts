import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveReservationsComponent } from '../active-reservations/active-reservations.component';

const routes: Routes = [
    { path: 'active-reservations', component: ActiveReservationsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReceptionistRoutingModule {}
