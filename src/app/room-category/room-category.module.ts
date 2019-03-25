import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CategoriesService } from '../_services/categories.service';
import { NewRoomComponent } from './new-room/new-room.component';
import { RoomCategoryComponent } from './room-category.component';
import { RoomCategoryRoutingModule } from './room-category-routing.module';

@NgModule({
  declarations: [
    NewRoomComponent,
    RoomCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoomCategoryRoutingModule
  ],
  providers: [
    CategoriesService
  ],
  entryComponents: [
    NewRoomComponent
  ]
})
export class RoomCategoryModule {}