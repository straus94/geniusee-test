import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GAP, PHONE_NUMBERS_CONTROL, PHONE_PATTERN, VALIDATION_MESSAGES } from '../core/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from '../app.interfaces';

@Injectable()
export class FormService {
  private errorMessages: BehaviorSubject<List<string>> = new BehaviorSubject<List<string>>({});
  public errorMessages$: Observable<List<string>> = this.errorMessages.asObservable();

  private errorPhoneMessages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public errorPhoneMessages$: Observable<string[]> = this.errorPhoneMessages.asObservable();

  constructor() {}

  public scrollToErrorField(form: FormGroup): void {
    const controls = form.controls;
    const errorKey = Object.keys(controls).find((key) => controls[key].invalid);
    const invalidControl = document.querySelector(errorKey === PHONE_NUMBERS_CONTROL ? '[formArrayName]' : '[formcontrolname="' + errorKey + '"]');

    if (!invalidControl) {
      return;
    }

    const y = invalidControl.getBoundingClientRect().top + window.pageYOffset - GAP;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  public getNewPhoneNumberControl(): FormControl {
    return new FormControl<string>('', Validators.compose([Validators.required, Validators.pattern(PHONE_PATTERN)]));
  }

  public setErrorMessages(keys: string[], form: FormGroup): void {
    const phoneErrorMessages: string[] = [];

    this.errorMessages.next(
      keys.reduce((prev, key) => {
        const dotIndex = key.indexOf('.');
        let errors;
        if (dotIndex > -1) {
          const [currentKey, currentIndex] = key.split('.');
          errors = (form.get(currentKey) as FormArray).at(+currentIndex).errors;

          if (errors) {
            const [[firstPhoneKey]] = Object.entries(errors);
            phoneErrorMessages.push(VALIDATION_MESSAGES[currentKey][firstPhoneKey]);
          }

          return prev;
        }

        errors = form.controls[key]?.errors;

        if (!errors) {
          return prev;
        }

        const [[firstKey]] = Object.entries(errors);
        return {
          ...prev,
          [key]: VALIDATION_MESSAGES[key][firstKey],
        };
      }, {})
    );

    this.errorPhoneMessages.next(phoneErrorMessages);
  }
}
