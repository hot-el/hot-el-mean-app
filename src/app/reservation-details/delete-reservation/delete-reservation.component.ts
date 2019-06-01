import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../_services/room.service';

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.scss']
})
export class DeleteReservationComponent implements OnInit {

  @Input() reservation: any;

  constructor(
    public thisDialogRef: MatDialogRef<DeleteReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.reservation = this.modalData.room;
  }

  onCloseConfirm() {
    const room_id = this.reservation._id;
    const reservation_id = this.reservation.reservations[0]._id;
    this.roomService.deleteReservation(room_id, reservation_id).subscribe(res => {
      this.thisDialogRef.close(true);
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close(false);
  }

}
