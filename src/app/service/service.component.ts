import { Component, OnInit } from '@angular/core';
import { ServicesService } from './service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditComponent } from './edit/edit.component';

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
    private router: Router,
    public dialog: MatDialog
  ) {
    dialog.afterAllClosed
    .subscribe(() => {
      this.getServices()
    })
   }

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

  delete(id) {
    this.serviceService.deleteService(id).subscribe();
    this.getServices()
  }

  edit(service) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: service
    })
  }

}
