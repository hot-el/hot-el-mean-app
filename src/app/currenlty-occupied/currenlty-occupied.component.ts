import { Component, OnInit } from '@angular/core';
import { RoomService } from '../_services/room.service';

@Component({
  selector: 'app-currenlty-occupied',
  templateUrl: './currenlty-occupied.component.html',
  styleUrls: ['./currenlty-occupied.component.scss']
})
export class CurrenltyOccupiedComponent implements OnInit {

  occupied: any;

  constructor(
    private roomService: RoomService) { }

  ngOnInit() {
    this.getOccupied();
  }

  getOccupied() {
    this.roomService.getOccupiedRooms().subscribe(occupied => {
      this.occupied = occupied;
    });
  }
}
