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
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
        console.log('Delete event', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: MyEvent[] = [
    {
      start: new Date(Date.now()),
      end: new Date(Date.now()),
      firstName: 'Stanisław',
      lastName: 'Oksymoron',
      role: 'Manager',
      id: '1',
      color: colors.manager,
      actions: this.actions,
      title: 'Stanisław Oksymoron Manager',
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: false
    }
  ];

  activeDayIsOpen = true;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.createForm();
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployeesByManager()
        .subscribe(e => this.employees = e);
  }

  dayClicked({ date, events }: { date: Date; events: MyEvent[] }): void {
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
    this.events.push(event);
    this.refresh.next();
  }

  createForm() {
    // event form validations
    this.eventForm = this.fb.group({
      employee: ['', Validators.required ],
      date: [new Date(Date.now()), Validators.required],
      to: new FormControl(16, Validators.required),
      from: [8, Validators.required]
    });
  }

  onSubmitEvent(values) {
    // console.log(values);
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
    values.role = values.employee.roles[0];
    values.start = values.date;
    values.end = values.date;
    values.actions = this.actions;
    values.id = values.employee._id;
    delete values.employee;
    values.title = values.firstName + ' ' + values.lastName + ' ' + values.role +  ' (' + values.from + '-' + values.to + ')';
    console.log(values);
    this.addEvent(values);
  }

}






