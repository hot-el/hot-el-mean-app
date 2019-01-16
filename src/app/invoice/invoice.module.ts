import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [InvoiceComponent, DetailComponent],
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
