import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { EmployeeService } from '../../_services/employee.service';
import { CustomValidators } from '../../_services/custom_validators';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-new-employee-form',
  templateUrl: './new-employee-form.component.html',
  styleUrls: ['./new-employee-form.component.scss']
})
export class NewEmployeeFormComponent implements OnInit {

  employeeForm: FormGroup;
  userId = '';

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
      { type: 'required', message: 'Please birthday' },
      { type: 'DateGreaterThanToday', message: 'He/She cant be born in the future' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'emailVal', message: 'Enter a valid email' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<NewEmployeeFormComponent>,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
    ) {}

  // Getters
  get name() { return this.employeeForm.get('FirstName'); }
  get email() { return this.employeeForm.get('email'); }

  ngOnInit() {
    this.createForms();

    this.route.params
      .subscribe(
        (params: Params) => {
          this.userId = params['id'] ? params['id'] : '';

          this.employeeForm.controls['email'].setAsyncValidators(
            CustomValidators.createEmailNotTakenValidator(this.employeeService, this.userId));
        }
      );
  }

  createForms() {
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

