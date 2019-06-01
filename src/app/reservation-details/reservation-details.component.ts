import { Component, OnInit, Input } from '@angular/core';
import { DeleteReservationComponent } from './delete-reservation/delete-reservation.component';
import { MatDialog } from '@angular/material';
import { RoomService } from '../_services/room.service';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CheckInComponent } from './check-in/check-in.component';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {

  @Input() reservation: any;
  canCheck: boolean = false;

  constructor(
    public dialog: MatDialog,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.getReservation();
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
      this.getReservation();
    });

  }

  openCheckIn(room) {
    const dialogRef = this.dialog.open(CheckInComponent, {
      data: { room: room }
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.router.navigateByUrl('/active-reservations');
      }
    });

  }

  getReservation(): void {
    const room_id = this.route.snapshot.paramMap.get('room_id');
    const reservation_id = this.route.snapshot.paramMap.get('reservation_id');
    this.roomService.getReservation(room_id, reservation_id)
      .subscribe(room => {
        this.reservation = room;
        this.canCheck = Date.parse(room.reservations[0].from) >= Date.now() - 60 * 60 * 24 * 1000 && Date.parse(room.reservations[0].from) <= Date.now() + 60 * 60 * 24 * 1000;
      });
  }

  goBack(): void {
    this.location.back();
  }

}
