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
  styleUrls: ['./admin.component.scss']
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

  openNewAccountForm() {
    const dialogRef = this.dialog.open(NewAccountFormComponent);

    dialogRef.afterClosed().subscribe(acc => {
      if (acc !==  undefined && acc !== null) {
        this.accounts.push(acc);
      }
    });
  }

  fastRoute(id: string) {
    this.router.navigateByUrl('/accounts/detail/' + id);
  }

}
