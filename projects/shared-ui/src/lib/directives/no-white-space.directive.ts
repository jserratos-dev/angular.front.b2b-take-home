/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, ElementRef, inject, input } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  standalone: true,
  selector: 'input[aplazoNoWhiteSpace]',
  host: {
    '(input)': 'sanitizeValue()',
  },
})
export class AplazoNoWhiteSpaceDirective {
  readonly #elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
  readonly #ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  sanitizeValue(): void {
    const input  = this.#elementRef.nativeElement;
    const cursorPosition  = input.selectionStart;

    // TODO: sanitize the value to remove white spaces
    const  sanitizeValue = input.value.replace(/\s+/g, '');
    input.value = sanitizeValue;

    // TODO: propagate the value to the NgControl
    if (this.#ngControl) {
      this.#ngControl.control?.setValue(sanitizeValue, { emitEvent: false });
    }

    // TODO: preserve the cursor position
    if (cursorPosition !== null && cursorPosition !== undefined) {
      input.setSelectionRange(cursorPosition, cursorPosition);
    }
  }
}
