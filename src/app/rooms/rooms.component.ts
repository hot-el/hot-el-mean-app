import { Component, OnInit } from '@angular/core';
import { RoomService } from '../_services/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

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

  getRooms(): void {
    this.roomService.getRooms().subscribe(rooms => this.rooms = rooms);
  }

  getRoomsByCategory(category: string) {
    this.roomService.getRoomsByCategory(category).subscribe(rooms => this.rooms = rooms);
  }

  getRoomsByCategoryAndSize(category: string, size: string) {
    this.roomService.getRoomsByCategoryAndSize(category, size).subscribe(rooms => this.rooms = rooms);
  }

  fetchData() {
    if (this.size === 'all') {
      this.getRoomsByCategory(this.category);
      } else {
        this.getRoomsByCategoryAndSize(this.category, this.size);
      }
  }

}
