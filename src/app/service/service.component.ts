import { Component, OnInit } from '@angular/core';
import { ServicesService } from './service.service';
import { Router } from '@angular/router';

export interface Service {
  name: String,
  description: String,
  price: Number
}

@Component({
  selector: 'app-service',
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

  services: Service[]

  getServices() {
    this.serviceService.getServices()
      .subscribe(services => this.services = services)
  }

  create() {
    this.router.navigate(['create'])
  }

}
