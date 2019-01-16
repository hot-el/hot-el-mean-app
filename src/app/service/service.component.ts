import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor(
    private serviceService: ServiceService
  ) { }

  ngOnInit() {
  }

  services: any[]

  getServices() {
    return this.serviceService.getServices()
      .subscribe(services => this.services = services)
  }

}
