import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { CanActivate } from '@angular/router';

@Injectable()
export class ServiceGuard implements CanActivate{
  constructor(){}

  canActivate(){
    const user = (<any>window).user;
    return user && (user.isAdmin || user.isManager);
  }
}

const routes: Routes = [{
  path: '',
  canActivate: [ServiceGuard],
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
