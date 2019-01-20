import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../_services/employee.service';
import { MatDialog } from '@angular/material';
import {Router} from '@angular/router';

// import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { UpdateAccountFormComponent } from './update-account-form/update-account-form.component';


@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  account: any;
  isAdmin: boolean;
  id: string;
  // employees: any;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.account);
    this.getEmployee();
    // this.getEmployees();console.log(this.account);
  //   if (this.account.roles[0] === 'Admin') {
  //     this.isAdmin = true;
  //   }
    console.log('onInit');
    console.log(this.account);
  }

  getEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id');
    console.log(id);
    this.employeeService.getEmployee(id)
      .subscribe(acc => this.account = acc);
    console.log('jo');
    console.log(this.account);
  }

  // getEmployees(): void {
  //   this.employeeService.getEmployees()
  //       .subscribe(employees => this.employees = employees);
  // }

  goBack(): void {
    this.router.navigateByUrl('/admin');
    // this.goBack();
  }

  save(): void {
    this.employeeService.updateEmployee(this.account)
      .subscribe(() => this.router.navigateByUrl('/admin'));
      // this.goBack();
  }

  openUpdateAccount(account) {
    // console.log('ej');
    // console.log(employee_.name);
    // console.log(employee_);
    const dialogRef = this.dialog.open(UpdateAccountFormComponent, {
      data: { account: account }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.account.firstName = confirm.firstName;
        this.account.lastName = confirm.lastName;
        this.account.birthday = confirm.birthday;
        this.account.gender = confirm.gender;
        this.account.roles = confirm.roles;
      }
      console.log('confirm');
      console.log(confirm);
    });
  }


  // delete(employee): void {
  //   this.employees = this.employees.filter(h => h !== employee);
  //   this.employeeService.deleteEmployee(employee).subscribe();
  // }

  openDeleteAccount(account) {
    const dialogRef = this.dialog.open(DeleteAccountComponent, {
      data: { account: account }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        // this.delete(employee);
        this.router.navigateByUrl('/admin');
        // this.goBack();
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


