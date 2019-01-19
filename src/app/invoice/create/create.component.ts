import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { reference } from '@angular/core/src/render3';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';

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
  invoiceForm: FormGroup;
  
  services: Service[] = [];
  serviceInput = new FormControl('');
  quantity = new FormControl('');
  
  selectedServices: any[] = [];

  subtotal: number = 0;
  grandtotal: number = 0;
  
  constructor(private invoiceService: InvoiceService, private fb: FormBuilder, private router: Router) { 
  }
  
  ngOnInit() { 
    this.getServices();

    this.invoiceForm = this.fb.group({
      invoiceNumber: null,
      issueDate: null,
      dueDate: null,
      tax: [23],
    });
  }
  
  getServices() {
    this.invoiceService.getServices()
      .subscribe(services => this.services = services)
  }

  displayFn(service): string {
    return service ? service.name : service;
  }

  Add() {
    let chosenService = this.serviceInput.value as Service;
    let chosenQuantity = this.quantity.value as number; 
    let total = chosenService.price as number * chosenQuantity;

    this.selectedServices.push({
      name: chosenService.name,
      description: chosenService.description,
      price: chosenService.price,
      quantity: chosenQuantity,
      total: total
    })

    this.subtotal += total;
    this.grandtotal += total * (this.invoiceForm.get('tax').value/100) + total;

    this.serviceInput.reset();
    this.quantity.reset();
  }

  delete(i) {
    let total = this.selectedServices[i].total;
    this.subtotal -= total;
    this.grandtotal -= total * (this.invoiceForm.get('tax').value/100) + total;
    this.selectedServices.splice(i, 1);
  }

  submit() {
    let invoice = {
      invoiceNumber: this.invoiceForm.get('invoiceNumber').value as string,
      issueDate: this.invoiceForm.get('issueDate').value as Date,
      dueDate: this.invoiceForm.get('dueDate').value as Date,
      services: this.selectedServices,
      subTotal: this.subtotal as number,
      tax: this.invoiceForm.get('tax').value as number,
      grandTotal: this.grandtotal as number
    }

    this.invoiceService.addInvoice(invoice).subscribe();
    this.router.navigate(['/invoice']);
  }

  cancel() {
    this.router.navigate(['/invoice'])
  }
}