import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { NewAccountFormComponent } from './new-account-form/new-account-form.component';
import { SharedModule } from '../shared/shared.module';
import { SearchAccountsComponent } from './search-accounts/search-accounts.component';
import { FilterPipe } from './search-accounts/filter.pipe';

@NgModule({
  declarations: [
    AdminComponent,
    NewAccountFormComponent,
    SearchAccountsComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  entryComponents: [
    NewAccountFormComponent
  ],
  providers: [
    OnlyAdminUsersGuard
  ]})
export class AdminModule {}
