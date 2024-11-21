/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, ElementRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: 'input[aplazoLowercase]',
  host: {
    '(input)': 'sanitizeValue($event)',
  },
})
export class AplazoLowercaseDirective {
  readonly #elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
  readonly #ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  sanitizeValue(event: InputEvent): void {
    const input = this.#elementRef.nativeElement;
    const cursorPosition = input.selectionStart;

    // TODO: sanitize the value to lowercase
    let value = input.value;
    value = value.toLowerCase();
    input.value = value;

    // TODO: propagate the value to the NgControl
    if (this.#ngControl) {
      this.#ngControl.control?.setValue(value, { emitEvent: false });
    }

    // TODO: preserve the cursor position
    if (cursorPosition !== null && cursorPosition !== undefined) {
      input.setSelectionRange(cursorPosition, cursorPosition);
    }
  }
}
