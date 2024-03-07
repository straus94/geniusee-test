import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GAP, PHONE_PATTERN} from '../core/constants';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor() {}

  public scrollToErrorField(form: FormGroup): void {
    const controls = form.controls;
    const errorKey = Object.keys(controls).find(key => controls[key].errors);
    const invalidControl = document.querySelector('[formcontrolname="' + errorKey + '"]');

    if (!invalidControl) {
      return
    }

    const y = invalidControl.getBoundingClientRect().top + window.pageYOffset - GAP;
    window.scrollTo({top: y, behavior: 'smooth'});
  }

  public getNewPhoneNumberControl(): FormControl {
    // return new FormControl<string>('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]);
    return new FormControl<string>('', Validators.compose([
      Validators.required,
      Validators.pattern(PHONE_PATTERN)]));
  }

}
