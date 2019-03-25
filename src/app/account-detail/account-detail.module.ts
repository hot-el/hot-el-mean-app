import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { UpdateAccountFormComponent } from './update-account-form/update-account-form.component';
import { AccountDetailComponent } from './account-detail.component';

@NgModule({
  declarations: [
    AccountDetailComponent,
    DeleteAccountComponent,
    UpdateAccountFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    DeleteAccountComponent,
    UpdateAccountFormComponent
  ]
})
export class AccountDetailModule {}