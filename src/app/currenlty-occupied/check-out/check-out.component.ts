import { Component, OnInit, Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../_services/room.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  @Input() reservation: any;
  @Input() roomPrice: any;

  constructor(
    public thisDialogRef: MatDialogRef<CheckOutComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.reservation = this.modalData.room;
    const from = new Date(this.reservation.reservations[0].from);
    const to = new Date(this.reservation.reservations[0].to);
    const timeDiff = Math.abs(to.getTime() - from.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (this.reservation.type === 'Premium') {
      if (days === 0) {
        this.roomPrice = 100;
      } else {
          this.roomPrice = days * 100;
      }
    } else {
      if (days === 0) {
        this.roomPrice = 50;
      } else {
          this.roomPrice = days * 50;
      }
    }
  }

  onCloseConfirm() {
    const room_id = this.reservation._id;
    const reservation_id = this.reservation.reservations[0]._id
    let reservation = {
      occupied: false,
      checkedIn: false
    }
    this.roomService.updateReservation(room_id, reservation_id, reservation).subscribe(res => {
      this.thisDialogRef.close(true);
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close(null);
  }
}
