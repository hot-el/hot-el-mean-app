import { Component, OnInit, ViewEncapsulation, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeService } from '../../_services/employee.service';

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
    'Recepcionist',
    'Waiter',
    'Cleaner',
    'Admin'
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
    public thisDialogRef: MatDialogRef<UpdateAccountFormComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public modalData: any) { }

  ngOnInit() {
    console.log('onInit');
    console.log(this.modalData.account);
    this.account = this.modalData.account;
    console.log(this.account);
    this.createForms(this.modalData);
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors {
    const password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    } : null;
  }

  createForms(modalData: any) {
    this.updateAccountForm = this.fb.group({
      firstName: [this.account.firstName, Validators.required ],
      lastName: [this.account.lastName, Validators.required],
      birthday: [this.account.birthday, Validators.required],
      email: new FormControl(this.account.email, [Validators.required, Validators.email]),
      gender: new FormControl(this.account.gender, Validators.required),
      roles: new FormControl(this.account.roles[0], Validators.required),
      password: new FormControl('password', [Validators.required]),
      repeatPassword: new FormControl('password', [Validators.required, this.passwordsMatchValidator])
    });
  }

  get email(): any { return this.updateAccountForm.get('email'); }
  get password(): any { return this.updateAccountForm.get('password'); }
  get repeatPassword(): any { return this.updateAccountForm.get('repeatPassword'); }

  onSubmitAccount(value) {
    value.roles = new Array(value.roles);
    value._id = this.account._id;
    console.log('onSumbit');
    console.log(value);
    this.employeeService.updateEmployeeByAdmin(value).subscribe();
    this.thisDialogRef.close(value);
    // const newEmployee = this.modalData.employee;
    // newEmployee.name = values.name;
    // this.employeeService.updateEmployee(newEmployee)
    // .subscribe(name => {
    //   this.thisDialogRef.close(name);
    //   this.updateEmployeeForm.reset();
    // });
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
