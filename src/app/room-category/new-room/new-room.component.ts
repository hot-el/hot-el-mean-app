import { Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../_services/room.service';
import { CustomValidators } from '../../_services/custom_validators';

@Component({
  selector: 'app-new-room-form',
  templateUrl: './new-room.component.html',
  exportAs: 'newRoomForm',
  styleUrls: ['../../styles/modals.scss']
})

export class NewRoomComponent implements OnInit {

  roomForm: FormGroup;
  roomDetailsForm: FormGroup;
  addRoomForm: FormGroup;

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
    'conservationDate': [
      { type: 'required', message: 'Please insert last conservation date' },
      { type: 'DateGreaterThanToday', message: 'Date cant be greater than today' }
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public roomService: RoomService,
    public thisDialogRef: MatDialogRef<NewRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForms();
  }

  onCloseCancel() {
    this.thisDialogRef.close(null);
  }

  onSubmit(values) {
    this.add(values);
  }

  createForms() {
    // room form validations
    this.roomForm = this.fb.group({
      type: [this.types[0], Validators.required ],
      conservationDate: [new Date(Date.now()), [Validators.required, CustomValidators.DateValidator]],
      size: new FormControl(this.sizes[0], Validators.required),
      number: ['', Validators.required]
    });
  }

  onSubmitRoom(value) {
    value.number = value.number.toString();
    this.add(value);
  }

  add(room): void {
    if (!room) { return; }
    this.roomService.addRoom(room)
      .subscribe(res => {
        this.thisDialogRef.close(res);
        this.roomForm.reset();
      });
  }

}

