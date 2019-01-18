import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  // employees: any;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getEmployee();
    // this.getEmployees();
    console.log(this.employee);
  }

  getEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.employeeService.getEmployee(id)
      .subscribe(e => this.employee = e);
    console.log('emp');
    console.log(this.employee);
  }

  // getEmployees(): void {
  //   this.employeeService.getEmployees()
  //       .subscribe(employees => this.employees = employees);
  // }

  goBack(): void {
    this.router.navigateByUrl('employees');
  }

  save(): void {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }

  openUpdateEmployeeForm(employee_) {
    console.log('ej');
    console.log(employee_.name);
    console.log(employee_);
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      data: { employee: employee_ }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.employee = confirm;
      }
      console.log('confirm');
      console.log(confirm);
    });
  }


  // delete(employee): void {
  //   this.employees = this.employees.filter(h => h !== employee);
  //   this.employeeService.deleteEmployee(employee).subscribe();
  // }

  openDeleteEmployeeModal(employee) {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: { employee: employee }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        // this.delete(employee);
        this.router.navigateByUrl('/employees');
        // refresh the employees list
        // const index = this.employees.findIndex((employee) => employee.id === employeeId);
        // this.employees.splice(index, 1);

        // TODO: evaluar cambiar esto por un operation method en loopback.
        // this.employeeService.getAnswers(employeeId)
        // .then(answers => {
        //   for(let answer of answers){
        //     this.answersService.deleteAnswer(answer.id);
        //   }
        // })
      }
    });
  }

}



