import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchEmployeesComponent } from './search-employees.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    SearchEmployeesComponent,
    FilterPipe
  ],
  exports: [
    SearchEmployeesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SearchEmployeesModule {}