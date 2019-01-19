import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ServiceComponent, DetailComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    SharedModule
  ],
  entryComponents: [EditComponent]
})
export class ServiceModule { }
