import { Component, OnInit } from '@angular/core';
import { RoomService } from '../_services/room.service';

@Component({
  selector: 'app-active-reservations',
  templateUrl: './active-reservations.component.html',
  styleUrls: ['./active-reservations.component.scss']
})
export class ActiveReservationsComponent implements OnInit {

  reservations: any;

  constructor(
    private roomService: RoomService) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.roomService.getActiveReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

}
