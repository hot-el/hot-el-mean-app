import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { DeleteRoomComponent } from './delete-room/delete-room.component';
import { RoomDetailsComponent } from './room-details.component';

@NgModule({
  declarations: [
    UpdateRoomComponent,
    DeleteRoomComponent,
    RoomDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    UpdateRoomComponent,
    DeleteRoomComponent
  ]
})
export class RoomDetailsModule {}