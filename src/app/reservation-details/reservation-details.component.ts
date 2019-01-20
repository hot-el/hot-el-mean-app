import { Component, OnInit, Input } from '@angular/core';
import { DeleteReservationComponent } from './delete-reservation/delete-reservation.component';
import { MatDialog } from '@angular/material';
import { RoomService } from '../_services/room.service';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {

  @Input() reservation: any;

  constructor(
    public dialog: MatDialog,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getRoom();
  }

  openDeleteReservation(room) {
    const dialogRef = this.dialog.open(DeleteReservationComponent, {
      data: { room: room }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.location.back();
      }
    });
  }

  openUpdateReservation(room) {
    const dialogRef = this.dialog.open(UpdateReservationComponent, {
      data: { room: room }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRoom();
    });

  }

  getRoom(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => {
        this.reservation = room;
      });
  }

  goBack(): void {
    this.location.back();
  }

}
