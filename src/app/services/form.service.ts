import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  private invalidControlKey: any;

  constructor() {}

  // public setFocusOnError(controls = null): void {
  //   if (!controls) {
  //     controls = this.form.controls;
  //   }

  //   for (const key of Object.keys(controls)) {
  //     const control = controls[key];

  //     if (!control.invalid) {
  //       continue;
  //     }

  //     if (!control.errors && control instanceof FormGroup) {
  //       this.setFocusOnError((control as FormGroup).controls);
  //     } else {
  //       this.invalidControlKey = key;
  //       const invalidControl = document.querySelector(
  //         '[formcontrolname="' + key + '"], [formgroupname="' + key + '"]'
  //       );

  //       if (!invalidControl) {
  //         return;
  //       }

  //       const card = (invalidControl as HTMLElement).closest('.ps-card');
  //       const y =
  //         ((card || invalidControl) as Element).getBoundingClientRect().top +
  //         window.pageYOffset -
  //         10;
  //       window.scrollTo({ top: y, behavior: 'smooth' });
  //     }
  //     break;
  //   }
  // }
}
