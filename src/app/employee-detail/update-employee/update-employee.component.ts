import { Component, OnInit, ViewEncapsulation, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeService } from '../../_services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

  updateEmployeeForm: FormGroup;
  @Input() employee: any;
  @Input() id: string;

  genders = [
    'Male',
    'Female'
  ];

  positions = [
    'Manager',
    'Receptionist',
    'Waiter',
    'Cleaner'
  ];

  validation_messages = {
    'firstName': [
      { type: 'required', message: 'Name is required' }
    ],
    'lastName': [
        { type: 'required', message: 'Surame is required' }
    ],
    'gender': [
      { type: 'required', message: 'Please select gender' },
    ],
    'roles': [
        { type: 'required', message: 'Please insert position' },
    ],
    'birthday': [
      { type: 'required', message: 'Please birthday' },
    ]
  };

  constructor(
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<UpdateEmployeeComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public modalData: any) { }

  ngOnInit() {
    this.employee = this.modalData.employee;
    this.createForms(this.modalData);
  }

  createForms(modalData: any) {
    this.updateEmployeeForm = this.fb.group({
      firstName: [this.employee.firstName, Validators.required ],
      lastName: [this.employee.lastName, Validators.required],
      birthday: [this.employee.birthday, Validators.required],
      gender: new FormControl(this.employee.gender, Validators.required),
      roles: new FormControl(this.employee.roles[0], Validators.required)
    });
  }

  onSubmitEmployee(value) {
    value.roles = new Array(value.roles);
    value.gender = value.gender;
    value._id = this.employee._id;
    this.employeeService.updateEmployee(value).subscribe();
    this.thisDialogRef.close(value);
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }


}
