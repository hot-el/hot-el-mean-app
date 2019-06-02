import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BuildingPlanComponent } from './building-plan/building-plan.component';
import { CanActivate } from '@angular/router';



const routes: Routes = [{
	path: '',
	children: [{
	  path: '',
	  component: BuildingPlanComponent
	}]
  }];
  
  @NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
  })
  export class BuildingPlanRoutingModule { 
  
  }
  