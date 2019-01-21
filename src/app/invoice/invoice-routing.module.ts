import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { CreateComponent } from './create/create.component';
import { CanActivate } from '@angular/router';

@Injectable()
export class InvoiceGuard implements CanActivate{
  constructor(){}

  canActivate(){
    const user = (<any>window).user;
    return user && (user.isAdmin || user.isReceptionist || user.isManager);
  }

}

const routes: Routes = [{
  path: 'invoice',
  canActivate: [InvoiceGuard],
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
export class InvoiceRoutingModule { 

}
