import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CurrentUserComponent } from './current-user.component';

@NgModule({
  declarations: [
    CurrentUserComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    ChangePasswordComponent
  ]
})
export class CurrentUserModule {}