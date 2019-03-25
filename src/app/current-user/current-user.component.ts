import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  public user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public ngOnInit() {
    this.authService.me().subscribe(data => {
      this.user = data.user;
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }

  openChangePassword(user_) {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: { user: user_ }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.router.navigateByUrl('/your-account');
      }
    });
  }


}
