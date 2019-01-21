import { FormControl, Validators, AbstractControl } from '@angular/forms';

export class CustomValidators extends Validators {

    static DateValidator(control: AbstractControl): { [key: string]: boolean } | null {

        if (new Date(control.value) <= new Date(Date.now())) {
            return null;
        }

        if (control.value !== undefined) {
            return { 'DateGreaterThanToday': true };
        }

        return null;
    }

    static DateValidator2(control: AbstractControl): { [key: string]: boolean } | null {

        if (new Date(control.value) >= new Date(Date.now())) {
            return null;
        }

        if (control.value !== undefined) {
            return { 'DateSmallerThanToday': true };
        }

        return null;
    }

    static EmailValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;

        if (EMAIL_REGEXP.test(control.value)) {
            return null;
         }

        if (control.value !== undefined) {
            return { 'emailVal': true };
        }

        return null;
    }

    static NameValidator(control: AbstractControl): { [key: string]: boolean } | null {

        const NAME_REGEXP = /^[A-Z][a-z]+$/;

        if (NAME_REGEXP.test(control.value)) {
            return null;
         }

        if (control.value !== undefined) {
            return { 'nameVal': true };
        }

        return null;
    }

    static IDValidator(control: AbstractControl): { [key: string]: boolean } | null {

        const ID_REGEXP = /[A-Z]{3}[0-9]{6}$/;

        if (ID_REGEXP.test(control.value)) {
            return null;
         }

        if (control.value !== undefined) {
            return { 'idVal': true };
        }

        return null;
    }

    static passwordsMatchValidator(control: FormControl): { [key: string]: boolean } | null {
        const password = control.root.get('password');
        return password && control.value !== password.value ? {
          'passwordMatch': true
        } : null;
      }

}
