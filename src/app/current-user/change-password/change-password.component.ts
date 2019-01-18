import { Component, OnInit, ViewEncapsulation, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeService } from '../../_services/employee.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  @Input() user: any;
  @Input() id: string;

  constructor(
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<ChangePasswordComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public modalData: any) { }

  ngOnInit() {
    console.log('onInit');
    console.log(this.modalData.user);
    this.user = this.modalData.user;
    this.createForms();
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors {
    const password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    } : null;
  }

  createForms() {
    this.changePasswordForm = this.fb.group({
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator])
    });
  }

  get password(): any { return this.changePasswordForm.get('password'); }
  get repeatPassword(): any { return this.changePasswordForm.get('repeatPassword'); }

  onSubmitPassword(value) {
    value._id = this.user._id;
    console.log('onSumbit');
    console.log(value);
    this.employeeService.updatePassword(value).subscribe();
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
