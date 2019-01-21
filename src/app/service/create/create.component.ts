import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
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

  name = new FormControl('', Validators.required);
  description = new FormControl('');
  price = new FormControl('', [
    Validators.min(0),
    Validators.required
  ]);
  
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
