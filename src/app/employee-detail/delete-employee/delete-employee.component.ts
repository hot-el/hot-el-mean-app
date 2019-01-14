import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmployeeService } from '../../_services/employee.service';


@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent implements OnInit {

  employee: any;

  constructor(
    public thisDialogRef: MatDialogRef<DeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employee = this.modalData.employee;
    console.log('todelete');
    console.log(this.employee.firstName);
  }

  onCloseConfirm() {
    this.employeeService.deleteEmployee(this.modalData.employee._id)
    .subscribe(res => {
      this.thisDialogRef.close(true);
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close(false);
  }

}
