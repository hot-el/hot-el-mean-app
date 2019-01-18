import { Component, OnInit } from '@angular/core';
import { ServicesService } from './service.service';
import { Router } from '@angular/router';

export interface Service {
  _id: String,
  name: String,
  description: String,
  price: Number
}

@Component({
  selector: 'service-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor(
    private serviceService: ServicesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getServices()
  }

  services: any[]

  getServices() {
    this.serviceService.getServices()
      .subscribe(services => this.services = services)
  }

  create() {
    this.router.navigate(['create'])
  }

}
