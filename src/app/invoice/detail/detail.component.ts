import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Invoice } from '../invoice.component';

@Component({
  selector: 'invoice-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice
  ) { }

  ngOnInit() { }

  onNoClick(): void  {
    this.dialogRef.close();
  }
}