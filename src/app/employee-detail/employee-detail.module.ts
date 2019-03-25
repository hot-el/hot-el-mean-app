import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { EmployeeDetailComponent } from './employee-detail.component';

@NgModule({
  declarations: [
    UpdateEmployeeComponent,
    DeleteEmployeeComponent,
    EmployeeDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    UpdateEmployeeComponent,
    DeleteEmployeeComponent
  ]
})
export class EmployeeDetailModule {}