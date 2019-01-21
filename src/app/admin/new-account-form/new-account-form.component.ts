import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { EmployeeService } from '../../_services/employee.service';
import { CustomValidators } from '../../_services/custom_validators';


@Component({
  selector: 'app-new-account-form',
  templateUrl: './new-account-form.component.html',
  styleUrls: ['./new-account-form.component.scss']
})
export class NewAccountFormComponent implements OnInit {

 accountForm: FormGroup;

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
      { type: 'required', message: 'First name is required' },
      { type: 'nameVal', message: 'Invalid first name'}

    ],
    'lastName': [
        { type: 'required', message: 'Last name is required' },
        { type: 'nameVal', message: 'Invalid last name'}
    ],
    'gender': [
      { type: 'required', message: 'Please select gender' },
    ],
    'position': [
        { type: 'required', message: 'Please insert position' },
    ],
    'birthday': [
      { type: 'required', message: 'Please birthday' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<NewAccountFormComponent>,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.createForms();
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors {
    const password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    } : null;
  }

  createForms() {

    this.accountForm = this.fb.group({
      firstName: ['', [Validators.required, CustomValidators.NameValidator]],
      lastName: ['', [Validators.required, CustomValidators.NameValidator]],
      birthday: ['', Validators.required],
      gender: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        CustomValidators.EmailValidator
      ])),
    });
  }



  get email(): any { return this.accountForm.get('email'); }
  get password(): any { return this.accountForm.get('password'); }
  get repeatPassword(): any { return this.accountForm.get('repeatPassword'); }

  onSubmitAccount(values) {

    const user = {
      'firstName': values.firstName,
      'lastName': values.lastName,
      'gender': values.gender,
      'roles': [values.position],
      'email': values.email,
      'birthday': values.birthday
    };
    this.employeeService.createEmployeeByManager(user)
    .subscribe(u => {
      this.thisDialogRef.close(u);
      this.accountForm.reset();
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close(null);
  }


}


