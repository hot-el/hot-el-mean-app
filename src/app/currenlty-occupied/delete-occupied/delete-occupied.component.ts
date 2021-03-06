import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../_services/room.service';

@Component({
  selector: 'app-delete-occupied',
  templateUrl: './delete-occupied.component.html',
  styleUrls: ['./delete-occupied.component.scss']
})
export class DeleteOccupiedComponent implements OnInit {

  @Input() occupied: any;

  constructor(
    public thisDialogRef: MatDialogRef<DeleteOccupiedComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.occupied = this.modalData.room;
  }

  onCloseConfirm() {
    const room_id = this.occupied._id;
    const reservation_id = this.occupied.reservations[0]._id;
    console.log(room_id, reservation_id);
    this.roomService.deleteReservation(room_id, reservation_id).subscribe(res => {
      this.thisDialogRef.close(true);
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close(false);
  }

}
