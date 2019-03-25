import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from '../employees/employees.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { RoomCategoryComponent } from '../room-category/room-category.component';

const routes: Routes = [
    { path: 'employees', component: EmployeesComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'room-categories', component: RoomCategoryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ManagerRoutingModule {}
