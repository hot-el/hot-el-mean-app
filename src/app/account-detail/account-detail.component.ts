import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';
import { MatDialog } from '@angular/material';
import {Router} from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {

    this.getEmployee();
  }

  getEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe(acc => this.account = acc);
  }

  goBack(): void {
    this.router.navigateByUrl('/admin');
  }

  save(): void {
    this.employeeService.updateEmployee(this.account)
      .subscribe(() => this.router.navigateByUrl('/admin'));
  }

  openUpdateAccount(account) {
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
        this.account.email = confirm.email;
      }
    });
  }

  openDeleteAccount(account) {
    const dialogRef = this.dialog.open(DeleteAccountComponent, {
      data: { account: account }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.router.navigateByUrl('/admin');
      }
    });
  }

}


