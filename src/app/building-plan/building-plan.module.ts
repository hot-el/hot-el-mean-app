import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectRoomComponent } from './rect-room/rect-room.component';
import { StairsComponent } from './stairs/stairs.component';
import { BuildingPlanComponent } from './building-plan/building-plan.component';
import { SharedModule } from '../shared/shared.module';
import { BuildingPlanRoutingModule } from './building-plan-routing.module';

@NgModule({
  declarations: [RectRoomComponent, StairsComponent, BuildingPlanComponent],
  imports: [
    CommonModule,
    SharedModule,
    BuildingPlanRoutingModule
  ],
  exports: [
    BuildingPlanComponent
  ]
})
export class BuildingPlanModule { }
