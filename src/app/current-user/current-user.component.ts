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
