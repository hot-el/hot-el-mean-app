import { Component, OnInit, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../../_services/room.service';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit {

  reservationForm: FormGroup;
  room: any;

  sizes = [
    2,
    4,
    6
  ];

  types = [
    'Premium',
    'Basic'
  ];

  validation_messages = {
    'type': [
      { type: 'required', message: 'Type is required' },
    ],
    'number': [
      { type: 'required', message: 'Please select room number' },
      { type: 'pattern', message: 'You can pick only numbers' }
    ],
    'size': [
      { type: 'required', message: 'Please select number of people' },
    ],
    'dateConservation': [
      { type: 'required', message: 'Please insert last conservation date' },
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public roomService: RoomService,
    public thisDialogRef: MatDialogRef<NewReservationComponent>,
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
      firstName: [this.types[0], Validators.required ],
      lastName: [this.types[0], Validators.required ],
      idCard: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
  }

  onSubmitReservation(values) {
    let reservation = new Object();
    const id = this.room._id;
    delete this.room._id;
    reservation = this.room;
    reservation['occupied'] = true;
    reservation['firstName'] = values.firstName;
    reservation['lastName'] = values.lastName;
    reservation['from'] = values.from;
    reservation['to'] = values.to;
    reservation['idCard'] = values.idCard;
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
