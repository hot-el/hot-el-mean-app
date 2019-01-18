import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Service {
  _id: String,
  name: String,
  description: String,
  price: Number
}

@Component({
  selector: 'invoice-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  filteredServices: Observable<Service[]>;
  services: Service[] = [];
  selectedServices: Service[];
  invoiceForm: FormGroup;
  serviceInput = new FormControl('');

  constructor(private invoiceService: InvoiceService, private fb: FormBuilder) { 
    this.getServices();
    this.filteredServices = this.serviceInput.valueChanges
      .pipe(
        startWith(''),
        map(service => service ? this._filteredServices(service) : this.services.slice())
      );
  }
  
  ngOnInit() { 
    this.invoiceForm = this.fb.group({
      invoiceNumber: null,
      issueDate: null,
      dueDate: null,
      tax: null,
    });
  }

  private _filteredServices(value: string): Service[] {
    const filterValue = value.toLowerCase();
    return this.services.filter(service => service.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getServices() {
    this.invoiceService.getServices()
      .subscribe(services => this.services = services)
  }

  Add() {
    this.selectedServices.push(this.serviceInput.value);
  }
}
