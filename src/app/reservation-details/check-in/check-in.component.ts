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
    const room_id = this.reservation._id;
    const reservation_id = this.reservation.reservations[0]._id;
    let reservation = {
      occupied: true,
      checkedIn: true
    }
    this.roomService.updateReservation(room_id, reservation_id, reservation).subscribe(res => {
      this.thisDialogRef.close(true);
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close(false);
  }

}
