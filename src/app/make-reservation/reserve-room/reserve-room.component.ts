import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RoomService } from '../../_services/room.service';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reserve-room',
  templateUrl: './reserve-room.component.html',
  styleUrls: ['./reserve-room.component.scss']
})
export class ReserveRoomComponent implements OnInit {

  @Input() room: any;
  @Input() isReserved: any;
  reservations: any;

  from: any;
  to: any;

  constructor(
    public dialog: MatDialog,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.from = this.route.snapshot.paramMap.get('from');
    this.to = this.route.snapshot.paramMap.get('to');
    this.getRoom();
  }


  openNewReservationForm(room: any) {
    const dialogRef = this.dialog.open(NewReservationComponent, {
      data: { room: room, from: this.from, to: this.to }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.getRoom();
      }
      this.goBack();
    });
  }

  getRoom(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => {
        this.room = room;
        this.reservations = room.reservations;
        this.isReserved = true;
        // if (this.room.reserved === true) {
        //   this.isReserved = true;
        // }
      });
  }

  goBack(): void {
    this.location.back();
  }

}
