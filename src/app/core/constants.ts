import {List} from "../app.interfaces";

export const VALIDATION_MESSAGES: List = {
  firstName: {
    required: 'First Name is reqired'
  },
  lastName: {
    required: 'Last name is reqired'
  },

  email: {
    required: 'Email is reqired'
  },
  // phoneNumbers: new FormArray([new FormControl<string>('', Validators.required)], Validators.required),
  country: {
    required: 'Country is reqired'
  },
  address: {
    required: 'Adress is reqired'
  },

  creditCard: {
    required: 'Creadit card is reqired',
    invalidCreditCardNumber: 'Not a valid card number'
  },
  cvv2: {
    required: 'CVV is reqired',
    invalidCvvNumber: 'Not a valid CVV number'
  },
  agreeTerms: {
    required: 'Field is reqired'
  },
};

export const GAP = 80;
export const PHONE_PATTERN = /^\d{10}$/;
