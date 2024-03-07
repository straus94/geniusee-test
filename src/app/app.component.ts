import { Component, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, take, takeUntil } from 'rxjs';
import { ICountry, List } from './app.interfaces';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { EmailValidator, creditCardNumberValidator, cvvNumberValidator } from './core/validators';
import {FormService} from './services/form.service';

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

    email: new FormControl<string>('', [Validators.email, Validators.required, EmailValidator.emailValidator(this.apiService)]),
    phoneNumbers: new FormArray([this.formService.getNewPhoneNumberControl()], Validators.required),
    country: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),

    creditCard: new FormControl<string>('', [
      Validators.required,
      creditCardNumberValidator(),
    ]),
    cvv2: new FormControl<string>('', [
      Validators.required,
      cvvNumberValidator()
    ]),
    agreeTerms: new FormControl<string>('', Validators.required),
  });
  public countries: BehaviorSubject<ICountry[]> = new BehaviorSubject<
    ICountry[]
  >([]);

  public destroy: Subject<boolean> = new Subject<boolean>();
  public isLoading$: Observable<boolean> = this.apiService.isLoading$;
  public errorMessages$: Observable<List<string>> = this.formService.errorMessages$;

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
    this.apiService.getCountries().pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.countries.next(resp);
    });

    this.emailControl?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy)
    ).subscribe(email => {
      console.log(email);
    });

    this.form.statusChanges.pipe(takeUntil(this.destroy)).subscribe(status => {
      console.log(status);
    })

    this.form.valid
  }

  public addPhoneNumber() {
    this.phoneNumbers.push(this.formService.getNewPhoneNumberControl());
  }

  public removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  public onSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      this.formService.scrollToErrorField(this.form);
      const invalidKeys = Object.keys(this.form.controls).filter(key => this.form.controls[key].errors) //.map(key => key);
      console.log(invalidKeys);
      return;
    }

    this.apiService.fakeSubmit().subscribe();
  }

  public countryTrackBy(index: number, item: ICountry): string {
    return item.name.common;
  }

  // public getErrorMessage(key: string): string {
  //   const control = this.form.get(key);

  //   if (!control) {
  //     return '';
  //   }

  //   return this.formService.getErrorMessage(key, control);
  // }

  public blur(key: string): void {
    const control = this.form.get(key);
    if (!control || !control.errors) {
      return;
    }

    this.formService.setErrorMessage(key, control.errors)
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
