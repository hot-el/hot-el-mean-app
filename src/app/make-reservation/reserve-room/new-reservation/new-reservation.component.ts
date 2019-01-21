import { Component, OnInit, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../../_services/room.service';
import { CustomValidators } from '../../../_services/custom_validators';

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
    'from': [
      { type: 'required', message: 'Please insert from' },
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
    this.reservationForm = this.fb.group({
      firstName: ['', [Validators.required, CustomValidators.NameValidator]],
      lastName: ['', [Validators.required, CustomValidators.NameValidator] ],
      idCard: ['', [Validators.required, CustomValidators.IDValidator]],
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
