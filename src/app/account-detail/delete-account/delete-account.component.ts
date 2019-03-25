import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmployeeService } from '../../_services/employee.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  account: any;

  constructor(
    public thisDialogRef: MatDialogRef<DeleteAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.account = this.modalData.account;
  }

  onCloseConfirm() {
    this.employeeService.deleteEmployee(this.modalData.account._id)
    .subscribe(res => {
      this.thisDialogRef.close(true);
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close(false);
  }

}
