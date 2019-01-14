import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomComponent } from './room.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [{
    path: 'room',
    //canActivate
    children: [{
        path: '',
        component: RoomComponent
    }, {
        path: 'detail',
        component: DetailComponent
    }]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RoomRoutingModule {}