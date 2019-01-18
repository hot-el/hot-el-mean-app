import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView
} from 'angular-calendar';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { EmployeeService } from '../_services/employee.service';
import { ShiftService } from '../_services/shift.service';
import { AuthService } from '../auth/auth.service';

const colors: any = {
  manager: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  cleaner: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  waiter: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  receptionist: {
    primary: '#f39999',
    secondary: '#FDF1BA'
  }
};

// interface MyEvent extends CalendarEvent {
//   firstName: string;
//   lastName: string;
//   role: string;
//   id: string;
//   _id: string;
//   actions: any;
//   color: any;
// }

class MyEvent1 implements CalendarEvent {
  firstName: string;
  lastName: string;
  role: string;
  userId: string;
  _id: string;
  actions: any;
  start: Date;
  title: string;
  color: any;
  resizable: any;
  draggable: any;
  allDay: any;
  constructor(values) {
    this.actions = values.actions;
    this.firstName = values.firstName;
    this.lastName = values.lastName;
    this.role = values.role;
    this.userId = values.id;
    this._id = values._id;
    this.start = values.start;
    this.title = values.title;
    this.color = values.color;
    this.resizable = values.resizable;
    this.draggable = values.draggable;
    this.allDay = true;
  }
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-times"> Delete </i>',
      onClick: ({ event }: { event: MyEvent1 }): void => {
        this.shiftService.deleteShift(event._id).subscribe(() => {
          this.events = this.events.filter(iEvent => iEvent !== event);
        });
        this.handleEvent('Deleted', event);
      }
    }
  ];

  shifts: any;
  requests: any;
  size: number;
  obj: any;
  draggable = false;
  resizable: {
    beforeStart: true,
    afterEnd: true
  };

  eventForm: FormGroup;
  employees: any;
  events: MyEvent1[] = new Array();


  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = true;

  user: any;
  adminOrManager: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private shiftService: ShiftService) {}

  ngOnInit(): void {
    this.authService.me().subscribe(data => {
      this.user = data.user;
      if (this.user.roles[0] === 'Admin' || this.user.roles[0] === 'Manager') {
        this.shiftService.getShifts().subscribe((requests) => {
          this.requests = requests;
          this.size = this.requests.length;
          for (let i = 0; i < this.size; i++) {
            this.obj = {
              userId: this.requests[i].userId,
              _id: this.requests[i]._id,
              role: this.requests[i].role,
              title: this.requests[i].title,
              start: new Date(this.requests[i].start),
              firstName: this.requests[i].firstName,
              lastName: this.requests[i].lastName,
              color: this.requests[i].color,
              draggable: this.draggable,
              actions: this.actions,
              resizable: this.resizable
            };
            this.events.push(new MyEvent1(this.obj));
            this.refresh.next();
          }
        });
        this.adminOrManager = true;
        this.createForm();
        this.getEmployees();
      } else {
        this.actions = [];
        this.shiftService.getShiftsByUserId(this.user._id).subscribe((requests) => {
          this.requests = requests;
          this.size = this.requests.length;
          for (let i = 0; i < this.size; i++) {
            this.obj = {
              userId: this.requests[i].userId,
              _id: this.requests[i]._id,
              role: this.requests[i].role,
              title: this.requests[i].title,
              start: new Date(this.requests[i].start),
              firstName: this.requests[i].firstName,
              lastName: this.requests[i].lastName,
              color: this.requests[i].color,
              draggable: this.draggable,
              actions: this.actions,
              resizable: this.resizable
            };
            this.events.push(new MyEvent1(this.obj));
            this.refresh.next();
          }
        });
      }
    });
  }

  getEmployees(): void {
    this.employeeService.getEmployeesByManager()
        .subscribe(e => this.employees = e);
  }

  getEvents() {
    this.shiftService.getShifts().subscribe(shift => this.shifts = shift);
  }

  dayClicked({ date, events }: { date: Date; events: MyEvent1[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true || events.length === 0)
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
    console.log('Day was clicked');
    console.log(events);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('Event clicked', action, ', ', event);
  }

  addEvent(event): void {
    this.shiftService.addShift(event).subscribe(e => {
      this.events.push(new MyEvent1(event));
      this.refresh.next();
    });
  }

  createForm() {
    this.eventForm = this.fb.group({
      employee: ['', Validators.required ],
      start: [new Date(Date.now()), Validators.required],
      to: new FormControl(16, Validators.required),
      from: [8, Validators.required]
    });
  }

  onSubmitEvent(values) {
    this.eventForm.controls['employee'].reset();
    if (values.employee.roles[0] === 'Manager') {
      values.color = colors.manager;
    } else if (values.employee.roles[0] === 'Waiter') {
      values.color = colors.waiter;
    } else if (values.employee.roles[0] === 'Cleaner') {
      values.color = colors.cleaner;
    } else {
      values.color = colors.receptionist;
    }
    values.firstName = values.employee.firstName;
    values.lastName = values.employee.lastName;
    values.userId = values.employee._id;
    values.actions = this.actions;
    values.resizable = {
      beforeStart: true,
      afterEnd: true
    };
    values.draggable = this.draggable;
    values.role = values.employee.roles[0];
    values.title = values.firstName + ' ' + values.lastName + ' ' + values.role +  ' (' + values.from + '-' + values.to + ')';
    delete values.employee;
    this.addEvent(values);
  }

}






