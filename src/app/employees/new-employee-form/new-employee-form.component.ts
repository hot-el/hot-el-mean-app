import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { EmployeeService } from '../../_services/employee.service';
import { LowerCasePipe } from '@angular/common';
import { CustomValidators } from '../../_services/custom_validators';


@Component({
  selector: 'app-new-employee-form',
  templateUrl: './new-employee-form.component.html',
  styleUrls: ['./new-employee-form.component.scss']
})
export class NewEmployeeFormComponent implements OnInit {

  employeeForm: FormGroup;
//   accountDetailsForm: FormGroup;
//   addEmployeeForm: FormGroup;

//   matching_passwords_group: FormGroup;
//   country_phone_group: FormGroup;

  genders = [
    'Male',
    'Female'
  ];

  positions = [
    'Manager',
    'Recepcionist',
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
      { type: 'required', message: 'Please birthday' },
      { type: 'DateGreaterThanToday', message: 'He/She cant be born in the future' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'emailVal', message: 'Enter a valid email' }
    ]
  };

//   account_validation_messages = {
//     'username': [
//       { type: 'required', message: 'Username is required' },
//       { type: 'minlength', message: 'Username must be at least 5 characters long' },
//       { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
//       { type: 'pattern', message: 'Your username must contain only numbers and letters' },
//       { type: 'validUsername', message: 'Your username has already been taken' }
//     ],
//     'email': [
//       { type: 'required', message: 'Email is required' },
//       { type: 'pattern', message: 'Enter a valid email' }
//     ],
//     'confirm_password': [
//       { type: 'required', message: 'Confirm password is required' },
//       { type: 'areEqual', message: 'Password mismatch' }
//     ],
//     'password': [
//       { type: 'required', message: 'Password is required' },
//       { type: 'minlength', message: 'Password must be at least 5 characters long' },
//       { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
//     ],
//     'terms': [
//       { type: 'pattern', message: 'You must accept terms and conditions' }
//     ]
//   };

  constructor(
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<NewEmployeeFormComponent>,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    // this.matching_passwords_group = new FormGroup({
    //   password: new FormControl('', Validators.compose([
    //     Validators.minLength(5),
    //     Validators.required,
    //     Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    //   ])),
    //   confirm_password: new FormControl('', Validators.required)
    // }, (formGroup: FormGroup) => {
    //   return PasswordValidator.areEqual(formGroup);
    // });
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, CustomValidators.NameValidator]],
      lastName: ['', [Validators.required, CustomValidators.NameValidator]],
      birthday: ['', [Validators.required, CustomValidators.DateValidator]],
      gender: new FormControl(this.genders[0], Validators.required),
      position: new FormControl(this.positions[0], Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        CustomValidators.EmailValidator
      ])),
    });
  }


  onSubmitEmployee(values) {
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
      this.employeeForm.reset();
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close(null);
  }

}

