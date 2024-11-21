import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { LoginUseCase } from '../../../application/login.usecase';
import { ToastrService } from 'ngx-toastr';
import { AplazoNoWhiteSpaceDirective, AplazoLowercaseDirective } from '@apz/shared-ui';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, CommonModule, AplazoButtonComponent, AplazoLogoComponent, AplazoNoWhiteSpaceDirective, AplazoLowercaseDirective],
})
export class LoginComponent {
  public passwordVisible: boolean = false;
  readonly loginUseCase = inject(LoginUseCase);
  readonly toastService = inject(ToastrService);

  readonly username = new FormControl<string>('mysuper4dmin@gmail.com', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ],
  });

  readonly password = new FormControl<string>('mysuper4dmin', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly form = new FormGroup({
    username: this.username,
    password: this.password,
  });

  login(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loginUseCase
      .execute({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe({
        error: (err) => {
          this.toastService.error('Credenciales inválidas.', 'Error');
        },
      });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (control?.hasError('required')) {
      return '**Este campo es obligatorio';
    }

    if (control?.hasError('pattern')) {
      return '**El formato del correo electrónico no es válido';
    }

    return '';
  }

}
