import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';

import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { MatDialog } from '@angular/material';

import {Router} from '@angular/router';
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee: any;
  @Input() id: string;
  email: string;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe(e => this.employee = e);
  }

  goBack(): void {
    this.router.navigateByUrl('employees');
  }

  save(): void {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }

  openUpdateEmployeeForm(employee_) {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      data: { employee: employee_ }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.employee.firstName = confirm.firstName;
        this.employee.lastName = confirm.lastName;
        this.employee.birthday = confirm.birthday;
        this.employee.gender = confirm.gender;
        this.employee.roles = confirm.roles;
      }
    });
  }

  openDeleteEmployeeModal(employee) {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: { employee: employee }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.router.navigateByUrl('/employees');
      }
    });
  }

}



