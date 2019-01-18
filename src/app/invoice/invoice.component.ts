import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { MatDialog } from '@angular/material';
import { DetailComponent } from './detail/detail.component';

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  subTotal: number;
  tax: number;
  grandTotal: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(
    private invoiceService: InvoiceService,
    public dialog: MatDialog
  ) { }

  selectedInvoice: Invoice
  invoices: Invoice[]; 
  displayedColumns: string[] = [
    'invoiceNumber', 
    'issueDate', 
    'dueDate', 
    'subTotal',
    'tax',
    'grandTotal'
  ]
  
  ngOnInit() {
    this.getInvoices();
  }

  getInvoices(): void {
    this.invoiceService.getInvoices()
      .subscribe(invoices => this.invoices = invoices);
  }

  updateInvoice(invoice: Invoice): void {
    this.invoiceService.updateInvoice(invoice._id, invoice)
      .subscribe();
  }

  onSelect(invoice: Invoice): void {
    const dialogRef = this.dialog.open(DetailComponent, {
      data: invoice
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.updateInvoice(result)
    //   this.getInvoices()
    // })
  }

  

}
