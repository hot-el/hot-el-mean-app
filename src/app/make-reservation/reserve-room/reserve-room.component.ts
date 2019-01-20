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

  constructor(
    public dialog: MatDialog,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getRoom();
  }


  openNewReservationForm(room: any) {
    const dialogRef = this.dialog.open(NewReservationComponent, {
      data: { room: room }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.delete(room);
      }
    });
  }

  delete(room: any): void {
    this.roomService.deleteRoom(room);
    // .subscribe();
  }

  openUpdateRoomForm(room: any) {
    const dialogRef = this.dialog.open(NewReservationComponent, {
      data: { room: room }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRoom();
    });

  }

  getRoom(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => this.room = room);
  }

  goBack(): void {
    this.location.back();
  }

}
