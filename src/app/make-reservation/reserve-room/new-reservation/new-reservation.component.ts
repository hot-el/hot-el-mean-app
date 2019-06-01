import { Component, OnInit, Inject} from '@angular/core';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../../_services/room.service';
import { CustomValidators } from '../../../_services/custom_validators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit {

  reservationForm: FormGroup;
  room: any;
  from: any;
  to: any;

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
    'from': [
      { type: 'required', message: 'Please insert from' },
      { type: 'DateSmallerThanToday', message: 'Its too late' }
    ],
    'to': [
      { type: 'required', message: 'Please insert to' },
    ],
    'firstName': [
      { type: 'required', message: 'First name is required' },
      { type: 'nameVal', message: 'Invalid first name' }
    ],
    'lastName': [
      { type: 'required', message: 'Last name is required' },
      { type: 'nameVal', message: 'Invalid last name' }
    ],
    'idCard': [
      { type: 'required', message: 'ID card number is required' },
      { type: 'idVal', message: 'Invalid ID card number' }
    ]
  };

  constructor(
    public roomService: RoomService,
    public thisDialogRef: MatDialogRef<NewReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.room = this.modalData.room;
    this.from = this.modalData.from;
    this.to = this.modalData.to;
    this.createForms();
  }     

  onCloseCancel() {
    this.thisDialogRef.close(null);
  }

  createForms() {
    this.reservationForm = this.fb.group({
      firstName: ['', [Validators.required, CustomValidators.NameValidator]],
      lastName: ['', [Validators.required, CustomValidators.NameValidator] ],
      idCard: ['', [Validators.required, CustomValidators.IDValidator]]
      // from: ['', [Validators.required, CustomValidators.DateValidator2]],
      // to: ['', Validators.required]
    });
  }

  onSubmitReservation(values) {
    let reservation = new Object();
    const id = this.room._id;
    delete this.room._id;
    reservation['firstName'] = values.firstName;
    reservation['lastName'] = values.lastName;
    // reservation['from'] = values.from;
    // reservation['to'] = values.to;
    reservation['from'] = this.from;
    reservation['to'] = this.to;
    reservation['idCard'] = values.idCard;
    console.log(reservation);
    this.addReservationToRoom(reservation, id);
  }

  // addReservation(reservation, roomId): void {
  //   if (!reservation) { return; }
  //   this.roomService.updateRoom(reservation, roomId)
  //     .subscribe(res => {
  //       this.thisDialogRef.close(res);
  //       this.reservationForm.reset();
  //     });
  // }

  addReservationToRoom(reservation, roomId): void {
    if (!reservation) { return; }
    this.roomService.addReservationToRoom(reservation, roomId)
      .subscribe(res => {
        this.thisDialogRef.close(res);
        this.reservationForm.reset();
      });
  }

}
