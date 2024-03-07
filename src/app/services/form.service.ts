import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GAP, PHONE_PATTERN, VALIDATION_MESSAGES} from '../core/constants';
import {BehaviorSubject, Observable} from 'rxjs';
import {List} from '../app.interfaces';

@Injectable()
export class FormService {

  private errorMessages: BehaviorSubject<List<string>> = new BehaviorSubject<List<string>>({});
  public errorMessages$: Observable<List<string>> = this.errorMessages.asObservable();

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
    return new FormControl<string>('', Validators.compose([
      Validators.required,
      Validators.pattern(PHONE_PATTERN)]));
  }

  public setErrorMessage(key: string, errors: List<string>): void {
    const [[firstKey]] = Object.entries(errors);
    this.errorMessages.next({[key]: VALIDATION_MESSAGES[key][firstKey]})
  }

}
