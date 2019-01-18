import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface Service {
  name: String,
  description: String,
  price: Number
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private invoiceService: InvoiceService,
  ) { 
    this.filtredServices = this.serviceCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterService(state) : this.services.slice())
      )
  }

  ngOnInit() {
    this.getServices()
  }


  invoiceNumber = new FormControl('');
  issueDate = new FormControl('');
  dueDate = new FormControl('');
  tax = new FormControl('');
  subTotal = new FormControl('');
  grandTotal = new FormControl('');
  serviceCtrl = new FormControl('');

  services: Service[]
  filtredServices: Observable<Service[]>

  _filterService(value: string): Service[] {
    const filterValue = value.toLowerCase();
    return this.services.filter( service => service.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onCreate() {

  }

  getServices() {
    this.invoiceService.getServices()
      .subscribe(services => this.services = services)
  }

}
