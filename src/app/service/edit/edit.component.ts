import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../service.service';

interface Service {
  _id: string,
  name: string,
  description: string,
  price: number
}

@Component({
  selector: 'service-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service,
    private fb: FormBuilder,
    private db: ServicesService
  ) { 
  }
  
  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description],
      price: [this.data.price, [Validators.required,Validators.min(0)]]
    })
  }

  save() {
    let service = {
      name: this.form.get('name').value as string,
      description: this.form.get('description').value as string,
      price: this.form.get('price').value as number
    }
    this.db.updateService(this.data._id, service).subscribe();
    this.dialogRef.close();
  }
  
}
