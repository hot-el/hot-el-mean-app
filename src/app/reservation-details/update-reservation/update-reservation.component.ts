import { Component, OnInit, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../_services/room.service';

@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.scss']
})
export class UpdateReservationComponent implements OnInit {

  reservationForm: FormGroup;
  room: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public roomService: RoomService,
    public thisDialogRef: MatDialogRef<UpdateReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.room = this.modalData.room;
    this.createForms();
  }

  onCloseCancel() {
    this.thisDialogRef.close(null);
  }

  createForms() {
    // reservation form validations
    this.reservationForm = this.fb.group({
      from: [this.modalData.room.from, Validators.required],
      to: [this.modalData.room.to, Validators.required]
    });
  }

  onSubmitReservation(values) {
    let reservation = new Object();
    const id = this.room._id;
    delete this.room._id;
    reservation = this.room;
    reservation['from'] = values.from;
    reservation['to'] = values.to;
    this.addReservation(reservation, id);
  }

  addReservation(reservation, roomId): void {
    if (!reservation) { return; }
    this.roomService.updateRoom(reservation, roomId)
      .subscribe(res => {
        this.thisDialogRef.close(res);
        this.reservationForm.reset();
      });
  }

}
