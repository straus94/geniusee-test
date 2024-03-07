import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { List } from '../app.interfaces';
import { Observable, delay, map, of } from 'rxjs';

export function creditCardNumberValidator(): ValidatorFn {
  return (control: AbstractControl): List | null => {
    if (!control.value) {
      return null;
    }

    let cardNumber = control.value.replace(/\D/g, '');

    if (cardNumber.length !== 16 || isNaN(Number(cardNumber))) {
      return { invalidCreditCardNumber: true };
    }

    cardNumber = cardNumber.replace(/(\d{4})/g, '$1 ');

    if (cardNumber.charAt(cardNumber.length - 1) === ' ') {
      cardNumber = cardNumber.slice(0, -1);
    }

    if (control.value !== cardNumber) {
      control.setValue(cardNumber, { emitEvent: false });
    }

    return null;
  };
}

export function cvvNumberValidator(): ValidatorFn {
  return (control: AbstractControl<string>): List | null => {
    if (!control.value) {
      return null;
    }

    let cvvNumber = control.value.replace(/\D/g, '');

    if (cvvNumber.length !== 3 || isNaN(Number(cvvNumber))) {
      return { invalidCvvNumber: { value: control.value } };
    }

    cvvNumber = cvvNumber.replace(/(\d{4})/g, '$1 ');

    if (cvvNumber.charAt(cvvNumber.length - 1) === ' ') {
      cvvNumber = cvvNumber.slice(0, -1);
    }

    if (control.value !== cvvNumber) {
      control.setValue(cvvNumber, { emitEvent: false });
    }

    return null;
  };
}

function mockAsyncValidation(): Observable<boolean> {
  const randomNumber = Math.floor(Math.random() * 100);

  return of(randomNumber < 50).pipe(delay(1000));
}

export function asyncEmailValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;

    if (!email) {
      return of(null);
    }

    return mockAsyncValidation().pipe(map((isValid) => (isValid ? null : { asyncEmail: true })));
  };
}
