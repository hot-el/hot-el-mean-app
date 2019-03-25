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

  getUnreservedRooms(): void {
    this.roomService.getUnreservedRooms().subscribe(rooms => this.rooms = rooms);
  }

  getUnreservedRoomsByCategory(category: string) {
    this.roomService.getRoomsByCategoryAndOccupied(category, false).subscribe(rooms => this.rooms = rooms);
  }

  getUnreservedRoomsByCategoryAndSize(category: string, size: string) {
    this.roomService.getRoomsByCategorySizeAndOccupied(category, size, false).subscribe(rooms => this.rooms = rooms);
  }

  fetchData() {
    if (this.size === 'all') {
      this.getUnreservedRoomsByCategory(this.category);
      } else {
        this.getUnreservedRoomsByCategoryAndSize(this.category, this.size);
      }
  }

}
