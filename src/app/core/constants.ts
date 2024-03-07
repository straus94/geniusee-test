import {List} from "../app.interfaces";

export const VALIDATION_MESSAGES: List = {
  firstName: {
    required: 'First Name is reqired'
  },
  lastName: {
    required: 'Last name is reqired'
  },

  email: {
    required: 'Email is reqired',
    email: 'Email is not valid',
    asyncEmail: 'Email already exists'
  },
  phoneNumbers: {
    required: 'Phone is reqired',
    pattern: 'Phone number is not valid'
  },
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
export const PHONE_NUMBERS_CONTROL = 'phoneNumbers';
