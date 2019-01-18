import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


import { AuthService } from '../auth/auth.service';
import * as schema from './schema/equipment.json';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  private userSubscription: Subscription;
  public user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public ngOnInit() {

    // init this.user on startup
    this.authService.me().subscribe(data => {
      this.user = data.user;
      // console.log(this.user);
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }

  openChangePassword(user_) {
    console.log('USER');
    console.log(user_);
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: { user: user_ }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        // this.delete(employee);
        this.router.navigateByUrl('/your-account');
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
