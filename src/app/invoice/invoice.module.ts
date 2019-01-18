import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [InvoiceComponent, DetailComponent, CreateComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule
  ],
  exports: [
    DetailComponent
  ],
  entryComponents: [
    DetailComponent
  ]
})
export class InvoiceModule { }
