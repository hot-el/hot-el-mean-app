import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EmployeesComponent } from './employees.component';
import { NewEmployeeFormComponent } from './new-employee-form/new-employee-form.component';
import { SearchEmployeesModule } from '../search-employees/search-employees.module';
import { ManagerRoutingModule } from '../manager/manager-routing.module';

@NgModule({
  declarations: [
    NewEmployeeFormComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SearchEmployeesModule,
    ManagerRoutingModule
  ],
  entryComponents: [
    NewEmployeeFormComponent
  ]
})
export class EmployeesModule {}