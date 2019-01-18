import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [{
  path: 'invoice',
  //canActivate
  children: [{
    path: '',
    component: InvoiceComponent
  }, {
    path: 'create',
    component: CreateComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
