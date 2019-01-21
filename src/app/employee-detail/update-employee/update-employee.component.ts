import { Component, OnInit, ViewEncapsulation, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeService } from '../../_services/employee.service';
import { CustomValidators } from '../../_services/custom_validators';

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
      { type: 'required', message: 'First Name is required' },
      { type: 'nameVal', message: 'First char must be capital (only characters)' }
    ],
    'lastName': [
        { type: 'required', message: 'Last is required' },
        { type: 'nameVal', message: 'First char must be capital (only characters)' }
    ],
    'gender': [
      { type: 'required', message: 'Please select gender' },
    ],
    'position': [
        { type: 'required', message: 'Please insert position' },
    ],
    'birthday': [
      { type: 'required', message: 'Please insert birthday' },
      { type: 'DateGreaterThanToday', message: 'He/She cant be born in the future' }
    ],
  };

  constructor(
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<UpdateEmployeeComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public modalData: any) { }

  ngOnInit() {
    this.employee = this.modalData.employee;
    this.createForms();
  }

  createForms() {
    this.updateEmployeeForm = this.fb.group({
      firstName: [this.employee.firstName, [Validators.required, CustomValidators.NameValidator]],
      lastName: [this.employee.lastName, [Validators.required, CustomValidators.NameValidator]],
      birthday: [this.employee.birthday, [Validators.required, CustomValidators.DateValidator]],
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
