import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  link: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  homeroutes: Tile[] 

  ngOnInit() { 
    this.homeroutes = [
      {text: 'Schedule', link: '/calendar', color: 'lightpink', cols: 3, rows: 1},
      {text: 'Manage your account', link: '/your-account', color: 'lightgreen', cols: 1, rows: 2},
      {text: 'Building Plan', link: '/building-plan', color: 'orange', cols: 3, rows: 1}
    ];

    const user = (<any>window).user;
    
    if(user.isManager || user.isAdmin) this.homeroutes.push(
      {text: 'Manager Panel', link: '/manager', color: 'lightblue', cols: 2, rows: 1},
    );

    if(user.isReceptionist || user.isAdmin) this.homeroutes.push(
      {text: 'Receptionist Panel', link: '/receptionist', color: 'lightyellow', cols: 2, rows: 1},
    );
   }

}
