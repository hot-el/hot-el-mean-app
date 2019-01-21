import { Component, OnInit, Input } from '@angular/core';
import { DeleteRoomComponent } from './delete-room/delete-room.component';
import { MatDialog } from '@angular/material';
import { RoomService } from '../_services/room.service';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  @Input() room: any;
  @Input() isOccupied;

  constructor(
    public dialog: MatDialog,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getRoom();
  }

  openDeleteRoom(room) {
    const dialogRef = this.dialog.open(DeleteRoomComponent, {
      data: { room: room }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.location.back();
      }
    });
  }

  openUpdateRoom(room) {
    const dialogRef = this.dialog.open(UpdateRoomComponent, {
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
        this.room = room;
        if (this.room.occupied === true) {
          this.isOccupied = true;
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

}
