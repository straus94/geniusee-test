import {AbstractControl, AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {List} from "../app.interfaces";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {ApiService} from "../services/api.service";

export function creditCardNumberValidator(): ValidatorFn {
  return (control: AbstractControl): List | null => {
    if (!control.value) {
      return null;
    }

    let cardNumber = control.value.replace(/\D/g, '');

    if (cardNumber.length !== 16 || isNaN(Number(cardNumber))) {
      return { 'invalidCreditCardNumber': true };
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
      return { 'invalidCvvNumber': { value: control.value } };
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

export class EmailValidator {
  static emailValidator(apiService: ApiService): AsyncValidatorFn {
    return (control: AbstractControl<string>): Observable<List | null> => {
      return apiService.fakeHttp(control.value);
    }
  }
}

