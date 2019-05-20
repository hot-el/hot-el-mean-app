import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../_services/room.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  @Input() reservation: any;

  constructor(
    public thisDialogRef: MatDialogRef<CheckInComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.reservation = this.modalData.room;
  }

  onCloseConfirm() {
    this.reservation.occupied = true;
    this.reservation.reserved = false;
    const id = this.reservation._id;
    delete this.reservation._id;
    this.roomService.updateRoom(this.reservation, id).subscribe(res => {
      this.thisDialogRef.close(true);
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close(false);
  }

}
