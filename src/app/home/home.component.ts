import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  routes: any[];

  ngOnInit() {  
    this.routes = [
      'room',
      'auth',
      'invoice',
      'service'
    ]
  }

}
