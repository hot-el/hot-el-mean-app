import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
// import { Person } from '../_models/person';
// import { NewEmployeeFormComponent } from '../employee-form/new-employee-form/new-employee-form.component';
import { MatDialog } from '@angular/material';
import { NewEmployeeFormComponent } from './new-employee-form/new-employee-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: any;
  name: string;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployeesByManager()
        .subscribe(employees => this.employees = employees);
  }

  // add(employee): void {
  //   if (!employee) { return; }
  //   this.employeeService.createEmployeeByManager(employee);
  //     // .subscribe(e => {
  //     //   this.employees.push(e);
  //     // });
  // }

  openNewEmployeeForm() {
    const dialogRef = this.dialog.open(NewEmployeeFormComponent);

    dialogRef.afterClosed().subscribe(employee => {
      if (employee !==  null && employee !== undefined && employee !== '') {
        this.employees.push(employee);
      }
    });
  }

  fastRoute(id: string) {
    // this.url = this.url + id;
    console.log(id);
    this.router.navigateByUrl('/detail/' + id);
  }

}
