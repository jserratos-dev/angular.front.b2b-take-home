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

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, CommonModule, AplazoButtonComponent, AplazoLogoComponent],
})
export class LoginComponent {
  public passwordVisible: boolean = false;
  readonly loginUseCase = inject(LoginUseCase);

  readonly username = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  readonly password = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly form = new FormGroup({
    username: this.username,
    password: this.password,
  });

  login(): void {
    this.loginUseCase
      .execute({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe();
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
