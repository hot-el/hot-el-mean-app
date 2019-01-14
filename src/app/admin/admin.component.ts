import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
// import { Person } from '../_models/person';
// import { NewEmployeeFormComponent } from '../employee-form/new-employee-form/new-employee-form.component';
import { MatDialog } from '@angular/material';
import { NewAccountFormComponent } from './new-account-form/new-account-form.component';
import { Router } from '@angular/router';
// import { NewEmployeeFormComponent } from '../new-employee-form/new-employee-form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  accounts: any;
  name: string;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts(): void {
    this.employeeService.getEmployees()
        .subscribe(acc => this.accounts = acc);
  }

  // add(employee): void {
  //   if (!employee) { return; }
  //   this.employeeService.createEmployeeByManager(employee);
  //     // .subscribe(e => {
  //     //   this.employees.push(e);
  //     // });
  // }

  openNewAccountForm() {
    const dialogRef = this.dialog.open(NewAccountFormComponent);

    dialogRef.afterClosed().subscribe(acc => {
      if (acc !==  undefined) {
        this.accounts.push(acc);
      }
    });
  }

  fastRoute() {
    this.router.navigateByUrl('/accounts/detail/5c3cac7e85957b37400fcb1d');
  }

}
