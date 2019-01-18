import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [{
  path: 'service',
  children: [{
    path: '',
    component: ServiceComponent
  }, {
    path: 'create',
    component: CreateComponent
  }, {
    path: 'detail',
    component: DetailComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
