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

  updateInvoice(): void {
    this.invoiceService.updateInvoice(this.selectedInvoice._id, this.selectedInvoice)
      .subscribe();
  }

  onSelect(invoice: Invoice): void {
    this.selectedInvoice = invoice

    const dialogRef = this.dialog.open(DetailComponent, {
      data: this.selectedInvoice
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedInvoice = result
      this.updateInvoice()
      this.getInvoices()
    })
  }

  

}
