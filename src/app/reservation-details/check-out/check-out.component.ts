import { Component, OnInit, Inject, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    public roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservation = this.modalData.room;
    console.log(this.reservation);
    const from = new Date(this.reservation.from);
    const to = new Date(this.reservation.to);
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
    this.reservation.occupied = false;
    const id = this.reservation._id;
    delete this.reservation._id;
    this.roomService.updateRoom(this.reservation, id).subscribe(res => {
      this.thisDialogRef.close(true);
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close(null);
  }
}
