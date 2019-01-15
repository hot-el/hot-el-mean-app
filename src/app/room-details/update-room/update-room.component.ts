import { Component, OnInit, EventEmitter, Output, Inject, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { RoomService } from '../../_services/room.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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
    'dateConservation': [
      { type: 'required', message: 'Please insert last conservation date' },
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
    console.log(this.room);
    console.log(this.room._id);
    this.createForms();
  }

  onCloseCancel() {
    this.thisDialogRef.close(null);
  }

  onSubmit(values) {
    this.room = values;
    console.log(this.room);

    // create new room
    // this.roomService.createRoom(data)
    // .subscribe(name => {
    //   this.thisDialogRef.close(name);
    //   this.roomForm.reset();
    // });
  }

  createForms() {
    // room form validations
    this.roomForm = this.fb.group({
      type: [this.room.type, Validators.required ],
      conservationDate: [this.room.conservationDate, Validators.required],
      size: new FormControl(this.room.size, Validators.required),
      number: [this.room.number, Validators.required]
    });
  }

  onSubmitRoom(values) {
    console.log(this.room._id);
    console.log('onSubmit');
    this.roomService.updateRoom(values, this.room._id)
       .subscribe(room => {
      this.thisDialogRef.close(room);
      this.roomForm.reset();
    });
  }

}
