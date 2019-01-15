import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../_services/room.service';

@Component({
  selector: 'app-delete-room',
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.scss']
})
export class DeleteRoomComponent implements OnInit {

  room: any;

  constructor(
    public thisDialogRef: MatDialogRef<DeleteRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.room = this.modalData.room;
    console.log('todelete');
    console.log(this.room);
  }

  onCloseConfirm() {
    console.log('confirmed');
    this.roomService.deleteRoom(this.modalData.room).subscribe(res => {
      this.thisDialogRef.close(true);
    });
    console.log('deleted');
  }

  onCloseCancel() {
    this.thisDialogRef.close(false);
  }

}
