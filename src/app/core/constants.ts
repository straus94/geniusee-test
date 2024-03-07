export const VALIDATION_MESSAGES = {
  firstName: {
    required: 'Field is reqired'
  },
  lastName: {
    required: 'Field is reqired'
  },

  email: {
    required: 'Field is reqired'
  },
  // phoneNumbers: new FormArray([new FormControl<string>('', Validators.required)], Validators.required),
  country: {
    required: 'Field is reqired'
  },
  address: {
    required: 'Field is reqired'
  },

  creditCard: {
    required: 'Field is reqired'
  },
  cvv2: {
    required: 'Field is reqired'
  },
  agreeTerms: {
    required: 'Field is reqired'
  },
};

export const GAP = 80;
export const PHONE_PATTERN = /^\d{10}$/;
