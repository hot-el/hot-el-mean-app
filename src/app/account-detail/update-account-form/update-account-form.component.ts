import { Component, OnInit, ViewEncapsulation, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeService } from '../../_services/employee.service';
import { CustomValidators } from '../../_services/custom_validators';

@Component({
  selector: 'app-update-account-form',
  templateUrl: './update-account-form.component.html',
  styleUrls: ['./update-account-form.component.scss']
})
export class UpdateAccountFormComponent implements OnInit {

  updateAccountForm: FormGroup;
  @Input() account: any;
  @Input() id: string;

  genders = [
    'Male',
    'Female'
  ];

  positions = [
    'Manager',
    'Receptionist',
    'Waiter',
    'Cleaner',
    'Admin'
  ];

  validation_messages = {
    'firstName': [
      { type: 'required', message: 'Name is required' },
      { type: 'nameVal', message: 'Invalid first name'}
    ],
    'lastName': [
        { type: 'required', message: 'Surame is required' },
        { type: 'nameVal', message: 'Invalid last name'}
    ],
    'gender': [
      { type: 'required', message: 'Please select gender' },
    ],
    'roles': [
        { type: 'required', message: 'Please insert position' },
    ],
    'birthday': [
      { type: 'required', message: 'Please birthday' },
      { type: 'DateGreaterThanToday', message: 'She/He cant be born in the future' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'emailVal', message: 'Invalid email' }
    ]

  };

  constructor(
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<UpdateAccountFormComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public modalData: any) { }

  ngOnInit() {
    this.account = this.modalData.account;
    this.createForms();
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors {
    const password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    } : null;
  }

  createForms() {
    this.updateAccountForm = this.fb.group({
      firstName: [this.account.firstName, [Validators.required, CustomValidators.NameValidator] ],
      lastName: [this.account.lastName, [Validators.required, CustomValidators.NameValidator] ],
      birthday: [this.account.birthday, [Validators.required, CustomValidators.DateValidator]],
      email: new FormControl(this.account.email, [Validators.required, CustomValidators.EmailValidator]),
      gender: new FormControl(this.account.gender, Validators.required),
      roles: new FormControl(this.account.roles[0], Validators.required),
      password: new FormControl('password', [Validators.required, Validators.min(5)]),
      repeatPassword: new FormControl('password', [Validators.required, this.passwordsMatchValidator])
    });
  }

  get email(): any { return this.updateAccountForm.get('email'); }
  get password(): any { return this.updateAccountForm.get('password'); }
  get repeatPassword(): any { return this.updateAccountForm.get('repeatPassword'); }

  onSubmitAccount(value) {
    value.roles = new Array(value.roles);
    value._id = this.account._id;
    this.employeeService.updateEmployeeByAdmin(value).subscribe();
    this.thisDialogRef.close(value);
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
