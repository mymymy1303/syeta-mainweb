import { Injectable } from '@angular/core';
import { REGEX } from './../common/regex.enum';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidatorUtil {

    UsernameValidator(control: AbstractControl): { [key: string]: any } | null {
        const valid = REGEX.USERNAME.test(control.value);
        return valid ? null : {
            invalidValue: {
                valid: false,
                value: control.value
            }
        };
    }

    EmailValidator(control: AbstractControl): { [key: string]: any } | null {
        const valid = REGEX.EMAIL.test(control.value);
        return valid ? null : {
            invalidValue: {
                valid: false,
                value: control.value
            }
        };
    }

    PasswordValidator(control: AbstractControl): { [key: string]: any } | null {
        const valid = REGEX.PASSWORD.test(control.value);
        return valid ? null : {
            invalidValue: {
                valid: false,
                value: control.value
            }
        };
    }

    PhoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
        const valid = REGEX.PHONE_NUMBER.test(control.value);
        return valid ? null : {
            invalidValue: {
                valid: false,
                value: control.value
            }
        };
    }

    NameValidator(control: AbstractControl): { [key: string]: any } | null {
        const valid = REGEX.NAME.test(control.value);
        return valid ? null : {
            invalidValue: {
                valid: false,
                value: control.value
            }
        };
    }

    TitleValidator(control: AbstractControl): { [key: string]: any } | null {
        const valid = REGEX.TITLE.test(control.value);
        return valid ? null : {
            invalidValue: {
                valid: false,
                value: control.value
            }
        };
    }

    PriceValidator(control: AbstractControl): { [key: string]: any } | null {
        const valid = REGEX.PRICE.test(control.value);
        return valid ? null : {
            invalidValue: {
                valid: false,
                value: control.value
            }
        };
    }
}
