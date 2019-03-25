import { Component, OnInit, EventEmitter, Output, Inject, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { RoomService } from '../../_services/room.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CustomValidators } from '../../_services/custom_validators';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss']
})
export class UpdateRoomComponent implements OnInit {

  room: any;
  roomForm: FormGroup;
  roomDetailsForm: FormGroup;
  updateRoomForm: FormGroup;

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
      { type: 'DateGreaterThanToday', message: 'Date cant be creater than today' }
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public roomService: RoomService,
    public thisDialogRef: MatDialogRef<UpdateRoomComponent>,
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
    // room form validations
    this.roomForm = this.fb.group({
      type: [this.room.type, Validators.required ],
      conservationDate: [this.room.conservationDate, [Validators.required, CustomValidators.DateValidator]],
      size: new FormControl(this.room.size, Validators.required),
      number: [this.room.number, Validators.required]
    });
  }

  onSubmitRoom(values) {
    this.roomService.updateRoom(values, this.room._id)
       .subscribe(room => {
      this.thisDialogRef.close(room);
      this.roomForm.reset();
    });
  }

}
