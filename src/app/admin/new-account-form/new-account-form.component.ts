import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import {
//   UsernameValidator,
//   PasswordValidator,
//   ParentErrorStateMatcher
// } from '../../validators';
import { MatDialogRef } from '@angular/material';

import { EmployeeService } from '../../_services/employee.service';
import { LowerCasePipe } from '@angular/common';
// import { Person } from '../../_models/person';
// import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-new-account-form',
  templateUrl: './new-account-form.component.html',
  styleUrls: ['./new-account-form.component.scss']
})
export class NewAccountFormComponent implements OnInit {

 accountForm: FormGroup;
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
    'name': [
      { type: 'required', message: 'Name is required' }
    ],
    'surname': [
        { type: 'required', message: 'Surame is required' }
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
    public thisDialogRef: MatDialogRef<NewAccountFormComponent>,
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

    // user details form validations
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.email
      ])),
    });


    // user links form validations
    // this.accountDetailsForm = this.fb.group({
    //   username: new FormControl('', Validators.compose([
    //    UsernameValidator.validUsername,
    //    Validators.maxLength(25),
    //    Validators.minLength(5),
    //    Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    //    Validators.required
    //   ])),
    //   email: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    //   ])),
    //   matching_passwords: this.matching_passwords_group,
    //   terms: new FormControl(false, Validators.pattern('true'))
    // });

    // this.addEmployeeForm = this.fb.group(({
    //     user: this.userDetailsForm,
    //     account: this.accountDetailsForm
    // }));
  }

//   onSubmitAccountDetails(value) {
//     console.log(value);
//   }

  onSubmitAccount(values) {
    // console.log(values);
    console.log(values.gender[0].toLowerCase());
    const user = {
      'firstName': values.firstName,
      'lastName': values.lastName,
      'gender': values.gender,
      'roles': [values.position],
      'email': values.email,
      'birthday': values.birthday
    };
    console.log(values.birthday);
    console.log(user);
    console.log('whats up?');
    // const username: string = values.firstName;
    // user.username = username;
    // user.email = values.email;
    // user.role = values.position;
    // console.log(user);
    // const person: Person = new Person();
    // person.firstName = values.firstName;
    // person.lastName = values.lastName;
    // person.gender = values.gender;
    // person.user = user;
    // console.log(person);
    // this.thisDialogRef.close(user);
    // const data: Employee = new Employee();
    // data.name = values.name;

    // create new employee
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


