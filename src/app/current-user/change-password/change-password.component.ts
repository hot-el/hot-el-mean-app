import { Component, OnInit, ViewEncapsulation, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeService } from '../../_services/employee.service';
import { CustomValidators } from '../../_services/custom_validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  @Input() user: any;
  @Input() id: string;

  validation_messages = {
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Min length: 5' }
    ],
    'repeatPassword': [
      { type: 'required', message: 'Please repeat password' },
      { type: 'passwordMatch', message: 'Password mismatch' },
      { type: 'minlength', message: 'Min length: 5' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    public thisDialogRef: MatDialogRef<ChangePasswordComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public modalData: any) { }

  ngOnInit() {
    this.user = this.modalData.user;
    this.createForms();
  }

  createForms() {
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(5), CustomValidators.passwordsMatchValidator]]
    });
  }

  onSubmitPassword(value) {
    value._id = this.user._id;
    this.employeeService.updatePassword(value).subscribe();
    this.thisDialogRef.close(value);
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
