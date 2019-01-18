import { Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RoomService } from '../../_services/room.service';

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
    'dateConservation': [
      { type: 'required', message: 'Please insert last conservation date' },
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
    // const data: Room = new Room();
    console.log(values);
    this.add(values);
    // create new room
    // this.roomService.createRoom(data)
    // .subscribe(name => {
    //   this.thisDialogRef.close(name);
    //   this.roomForm.reset();
    // });
  }

  createForms() {
    // room form validations
    console.log('creating forms');
    this.roomForm = this.fb.group({
      type: [this.types[0], Validators.required ],
      conservationDate: ['', Validators.required],
      size: new FormControl(this.sizes[0], Validators.required),
      number: ['', Validators.required]
    });
  }

  onSubmitRoom(value) {
    console.log(value);
    value.number = value.number.toString();
    console.log(value);
    this.add(value);
  }

  add(room): void {
    if (!room) { return; }
    console.log('add');
    this.roomService.addRoom(room)
      .subscribe(res => {
        this.thisDialogRef.close(res);
        this.roomForm.reset();
      });
  }

}

