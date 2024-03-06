import {AbstractControl, ValidatorFn} from "@angular/forms";

export function creditCardNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!control.value) {
      return null;
    }

    let cardNumber = control.value.replace(/\D/g, '');

    if (cardNumber.length !== 16 || isNaN(Number(cardNumber))) {
      return { 'invalidCreditCardNumber': { value: control.value } };
    }

    cardNumber = cardNumber.replace(/(\d{4})/g, '$1 ');
    console.log(cardNumber);

    if (cardNumber.charAt(cardNumber.length - 1) === ' ') {
      cardNumber = cardNumber.slice(0, -1);
    }

    if (control.value !== cardNumber) {
      control.setValue(cardNumber, { emitEvent: false });
    }

    return null;
  };
}
