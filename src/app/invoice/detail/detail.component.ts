import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Invoice } from '../invoice.component';
import { InvoiceService } from '../invoice.service';

interface shortS {
  name: string,
  price: number,
  quantity: number,
  total: number
}

@Component({
  selector: 'invoice-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  services: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() { }

  onNoClick(): void  {
    this.dialogRef.close();
  }

  delete() {
    let s = this.invoiceService.deleteInvoice(this.data._id).subscribe();
    while(s.closed) {}
    this.dialogRef.close();
  }

}