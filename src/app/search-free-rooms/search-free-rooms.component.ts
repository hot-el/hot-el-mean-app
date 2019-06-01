import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/category';
import { CategoriesService } from '../_services/categories.service';
import { MatDialog } from '@angular/material';
import { RoomService } from '../_services/room.service';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-search-free-rooms',
  templateUrl: './search-free-rooms.component.html',
  styleUrls: ['./search-free-rooms.component.scss']
})
export class SearchFreeRoomsComponent implements OnInit {

  categories: Category[];

  reservationForm: FormGroup;
  rooms: any;
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
      { type: 'required', message: 'Please insert to' }
    ]
  };


  constructor(
    public roomService: RoomService,
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
      this.createForms();
      this.categoriesService.getCategories()
      .then(
        categories => {
          this.categories = categories;
      });
  }

  createForms() {
    this.reservationForm = this.fb.group({
      type: ['Basic', [Validators.required]],
      from: [Date.now(), [Validators.required]],
      to: [Date.now(), Validators.required],
      size: [2, Validators.required]
    });
  }

  onSubmitSearch(values) {
    let search = new Object();
    search['from'] = values.from;
    search['to'] = values.to;
    search['size'] = values.size;
    search['type'] = values.type;
    this.to = values.to;
    this.from = values.from;
    this.searchRooms(search);
  }

  searchRooms(search) {
    this.roomService.searchFreeRoomsBySizeAndType(search.from, search.to, search.size, search.type)
      .subscribe(res => {
        this.rooms = res;
        console.log('lolo', this.rooms);
      })
  }

  routeToNewReservation(room) {
    return [`/new-reservation/${room._id}/${this.from}/${this.to}`]; 
  }

}
