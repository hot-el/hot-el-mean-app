import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../_services/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms-to-reserve',
  templateUrl: './rooms-to-reserve.component.html',
  styleUrls: ['./rooms-to-reserve.component.scss']
})
export class RoomsToReserveComponent implements OnInit {

  rooms: any;
  selectedRoom: any;
  category: string;
  size: string;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.category = this.route.snapshot.url[1].path;
    this.size = this.route.snapshot.url[2].path;
    this.fetchData();
  }

  getFreeRooms(): void {
    this.roomService.getFreeRooms().subscribe(rooms => this.rooms = rooms);
  }

  getFreeRoomsByCategory(category: string) {
    this.roomService.getRoomsByCategoryReservedAndOccupied(category, false, false).subscribe(rooms => this.rooms = rooms);
  }

  getFreeRoomsByCategoryAndSize(category: string, size: string) {
    this.roomService.getRoomsByCategorySizeReservedAndOccupied(category, size, false, false).subscribe(rooms => this.rooms = rooms);
  }

  fetchData() {
    if (this.size === 'all') {
      this.getFreeRoomsByCategory(this.category);
      } else {
        this.getFreeRoomsByCategoryAndSize(this.category, this.size);
      }
  }

}
