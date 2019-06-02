import { Component, OnInit } from '@angular/core';
import { BuildingPlanService } from '../building-plan.service';

interface IRoom {
  "x": number,
  "y": number,
  "width": number,
  "height": number,
  "fill": string,
  "name": string,
  "alert"?: string
}

@Component({
  selector: 'app-building-plan',
  templateUrl: './building-plan.component.html',
  styleUrls: ['./building-plan.component.scss']
})
export class BuildingPlanComponent implements OnInit {

  public rooms: IRoom[];
  public stairs: any[];
  floors: any[];

  constructor(private buildingPlanService: BuildingPlanService) { }

  ngOnInit() {
    this.getRooms(0);
    this.getStairs(0);
    this.floors = this.buildingPlanService.getfloors();
  }

  getRooms(i) {
      this.rooms = this.buildingPlanService.getRooms(i);
  }

  getStairs(i) {
    this.stairs = this.buildingPlanService.getStairs(i);
  }

  isMaintainance() {
    return this.rooms.find(x => x.fill==='lightgreen') !== undefined;
  }

  is2person() {
    return this.rooms.find(x => x.fill==='lightyellow') !== undefined;
  }

  is4person(){
    return this.rooms.find(x => x.fill==='lightblue') !== undefined;
  }

  onClick(i){
    this.getRooms(i);
    this.getStairs(i);
  }

}
