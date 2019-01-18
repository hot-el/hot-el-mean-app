import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, switchMap, tap, finalize } from 'rxjs/operators';

export interface Service {
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
  filteredServices: Service[] = [];
  invoiceForm: FormGroup;
  servicesForm: FormGroup;
  isLoading = false;

  constructor(private invoiceService: InvoiceService, private fb: FormBuilder) { }
  
  ngOnInit() { 
    this.invoiceForm = this.fb.group({
      invoiceNumber: null,
      issueDate: null,
      dueDate: null,
      tax: null,
    });

    this.servicesForm = this.fb.group({
      serviceInput: null
    })

    this.servicesForm
      .get('serviceInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.invoiceService.searchServices(value)
          .pipe(finalize(() => this.isLoading = false))
        )
      )
      .subscribe(services => this.filteredServices = services);
  }

}
