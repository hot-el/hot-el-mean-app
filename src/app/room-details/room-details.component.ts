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

  constructor(
    public dialog: MatDialog,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    console.log('Room Details activated');
    this.getRoom();
    console.log(this.room);
  }

  openDeleteRoom(room) {
    const dialogRef = this.dialog.open(DeleteRoomComponent, {
      data: { room: room }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.delete(room);
        this.location.back();
        // this.router.navigateByUrl('/Rooms');
        // refresh the Rooms list
        // const index = this.Rooms.findIndex((Room) => Room.id === RoomId);
        // this.Rooms.splice(index, 1);

        // TODO: evaluar cambiar esto por un operation method en loopback.
        // this.RoomService.getAnswers(RoomId)
        // .then(answers => {
        //   for(let answer of answers){
        //     this.answersService.deleteAnswer(answer.id);
        //   }
        // })
      }
    });
  }

  delete(room): void {
    this.roomService.deleteRoom(room);
    // .subscribe();
  }

  openUpdateRoom(room) {
    console.log(room);
    const dialogRef = this.dialog.open(UpdateRoomComponent, {
      data: { room: room }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('heyhey');
      this.getRoom();
      console.log('heykey2');
    });

  }

  getRoom(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.roomService.getRoom(id)
      .subscribe(room => this.room = room);
  }

  goBack(): void {
    this.location.back();
  }

}
