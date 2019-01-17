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
import { map } from 'rxjs/operators';

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

interface MyEvent extends CalendarEvent {
  firstName: string;
  lastName: string;
  role: string;
  id: string;
  _id: string;
  actions: any;
  color: any;
  
}

class MyEvent1 implements MyEvent {
  firstName: string;
  lastName: string;
  role: string;
  id: string;
  _id: string;
  actions: any;
  start: Date;
  title: string;
  color: any;
  resizable: any;
  draggable: any;
  constructor(values, actions) {
    this.actions = actions;
    this.firstName = values.firstName;
    this.lastName = values.lastName;
    this.role = values.role;
    this.id = values.id;
    this._id = values._id;
    this.start = values.start;
    this.title = values.title;
    this.color = values.color;
    this.resizable = {
      beforeStart: true,
      afterEnd: true
    };
    this.draggable = false;
  }
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  eventForm: FormGroup;
  employees: any;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-times"> Delete </i>',
      onClick: ({ event }: { event: MyEvent1 }): void => {
        console.log('delete');
        console.log(event._id);
        this.shiftService.deleteShift(event._id).subscribe(() => {
          this.events = this.events.filter(iEvent => iEvent !== event);
        });
        this.handleEvent('Deleted', event);
        console.log('Delete event', event);
      }
    }
  ];

  // e: MyEvent1 = new MyEvent1(this.actions);

  refresh: Subject<any> = new Subject();

  events: MyEvent1[] = new Array({
      start: new Date(Date.now()),
      firstName: 'Stanisław',
      lastName: 'Oksymoron',
      role: 'Manager',
      id: '1',
      _id: '2',
      color: colors.manager,
      actions: this.actions,
      title: 'Stanisław Oksymoron Manager',
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: false
  });

   x: MyEvent1 =  {
    start: new Date(Date.now()),
      firstName: 'Stanisław',
      lastName: 'Oksymoron',
      role: 'Manager',
      id: '1',
      _id: '2',
      color: colors.manager,
      actions: this.actions,
      title: 'Stanisław Oksymoron Manager 222222',
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: false
  };

  shifts: any;

  activeDayIsOpen = true;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private shiftService: ShiftService) {}

  ngOnInit(): void {
    this.createForm();
    this.getEmployees();
    this.getEvents();
    console.log('xxxx');
    console.log(this.x);
    this.events.push(this.x);
    // Object.keys(this.shifts).forEach(function (shift) {
    //   console.log(shift);
    // });
  }

  getEmployees(): void {
    this.employeeService.getEmployeesByManager()
        .subscribe(e => this.employees = e);
  }

  // getEvents() {
  //   this.shiftService.getShifts().pipe(map(shift => {
  //     const event = shift;
  //     event.actions = this.actions;
  //     event.allDay = true;
  //     event.resizable = {
  //       beforeStart: true,
  //       afterEnd: true
  //     };
  //     event.draggable = false;
  //   })).subscribe(event => this.events = event);
  // }

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
    console.log('Even clicked', action, ', ', event);
  }

  addEvent(event): void {
    this.shiftService.addShift(event).subscribe(e => {
      console.log('e');
      console.log(e);
      const data: MyEvent1 = new MyEvent1(e, this.actions);
      console.log(JSON.stringify(data));
      console.log('data');
      console.log(data);
      data.start = new Date(Date.now());
      this.events.push(data);
      console.log('events');
      console.log(this.events);
    });
    this.refresh.next();
  }

  createForm() {
    // event form validations
    this.eventForm = this.fb.group({
      employee: ['', Validators.required ],
      start: [new Date(Date.now()), Validators.required],
      to: new FormControl(16, Validators.required),
      from: [8, Validators.required]
    });
  }

  onSubmitEvent(values) {
    // console.log(values);
    // this.eventForm.reset(this.eventForm['employee']);
    if (values.employee.roles[0] === 'Manager') {
      values.color = colors.manager;
    } else if (values.employee.roles[0] === 'Waiter') {
      values.color = colors.waiter;
    } else if (values.employee.roles[0] === 'Cleaner') {
      values.color = colors.cleaner;
    } else {
      values.color = colors.receptionist;
    }
    this.eventForm.controls['employee'].reset();
    values.firstName = values.employee.firstName;
    values.lastName = values.employee.lastName;
    values.role = values.employee.roles[0];
    // values.actions = this.actions;
    values.id = values.employee._id;
    delete values.employee;
    values.title = values.firstName + ' ' + values.lastName + ' ' + values.role +  ' (' + values.from + '-' + values.to + ')';
    console.log('values');
    console.log(values);
    this.addEvent(values);
  }

}






