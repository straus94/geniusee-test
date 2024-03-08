import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { BehaviorSubject, Observable, Subject, catchError, of, takeUntil } from 'rxjs';
import { ICountry, List } from './app.interfaces';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { asyncEmailValidator, creditCardNumberValidator, cvvNumberValidator } from './core/validators';
import { FormService } from './services/form.service';
import { isNumber } from './core/helpers';
import {DEFAULT_COUNTRIES} from './core/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    MatToolbarModule,
    RxReactiveFormsModule,
  ],
  providers: [FormService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  public form: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),

    email: new FormControl<string>('', Validators.email, asyncEmailValidator()),
    phoneNumbers: new FormArray([this.formService.getNewPhoneNumberControl()]),
    country: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),

    creditCard: new FormControl<string>('', [Validators.required, creditCardNumberValidator()]),
    cvv2: new FormControl<string>('', [Validators.required, cvvNumberValidator()]),
    agreeTerms: new FormControl<string>('', Validators.required),
  });
  public countries: BehaviorSubject<ICountry[]> = new BehaviorSubject<ICountry[]>([]);

  public destroy: Subject<boolean> = new Subject<boolean>();
  public isLoading$: Observable<boolean> = this.apiService.isLoading$;
  public errorMessages$: Observable<List<string | string[]>> = this.formService.errorMessages$;
  public errorPhoneMessages$: Observable<string[]> = this.formService.errorPhoneMessages$;

  @ViewChild('formEl') formEl: any;

  constructor(private apiService: ApiService, private formService: FormService) {
    this.init();
  }

  private get cardNumberControl(): AbstractControl<string> | null {
    return this.form.get('creditCard');
  }

  private get emailControl(): AbstractControl<string> | null {
    return this.form.get('email');
  }

  public get phoneNumbers() {
    return this.form.get('phoneNumbers') as any;
  }

  formatCreditCardNumber() {
    if (!this.cardNumberControl) {
      return;
    }

    let value = this.cardNumberControl.value;
    value = value.replace(/\D/g, '');

    this.cardNumberControl.setValue(value, { emitEvent: false });
  }

  private init(): void {
    this.apiService
      .getCountries()
      .pipe(catchError(() => of(DEFAULT_COUNTRIES)))
      .subscribe((resp) => {
        this.countries.next(resp);
      });

    this.form.valid;
  }

  public addPhoneNumber() {
    this.phoneNumbers.push(this.formService.getNewPhoneNumberControl());
  }

  public removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.formService.scrollToErrorField(this.form);
      const invalidKeys = Object.keys(this.form.controls)
        .filter((key) => this.form.controls[key].invalid)
        .reduce((prev: string[], key) => {
          const control = this.form.get(key);
          if (control instanceof FormArray) {
            const idx = control.controls.filter((c) => c.invalid).map((_, i) => i);
            return [...prev, ...idx.map((id) => `${key}.${id}`)];
          }

          return [...prev, key];
        }, []);

      this.formService.setErrorMessages(invalidKeys, this.form);
      return;
    }

    this.apiService.fakeSubmit().subscribe(() => {
      this.formEl.resetForm();
    });
  }

  public countryTrackBy(index: number, item: ICountry): string {
    return item.name.common;
  }

  public blur(key: string, index?: number): void {
    const control = this.form.get(key);
    if (!control || (!control.errors && !isNumber(index))) {
      return;
    }

    const currentKey = isNumber(index) ? `${key}.${index}` : key;

    this.formService.setErrorMessages([currentKey], this.form);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
