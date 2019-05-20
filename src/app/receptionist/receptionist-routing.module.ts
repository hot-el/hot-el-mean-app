import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveReservationsComponent } from '../active-reservations/active-reservations.component';
import { CurrenltyOccupiedComponent } from '../currenlty-occupied/currenlty-occupied.component';


const routes: Routes = [
    { path: 'active-reservations', component: ActiveReservationsComponent },
    { path: 'currently-occupied', component: CurrenltyOccupiedComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReceptionistRoutingModule {}
