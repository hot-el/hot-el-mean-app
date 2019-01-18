import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { ServicesService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'service-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private serviceService: ServicesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  name = new FormControl('');
  description = new FormControl('');
  price = new FormControl('');
  
  onCreate() {
    let service = {
      name: `${this.name.value}`,
      description: `${this.description.value}`,
      price: this.price.value
    }
    this.serviceService.insertService(service)
      .subscribe(() => {this.router.navigate(['/service'])})
  }

}
