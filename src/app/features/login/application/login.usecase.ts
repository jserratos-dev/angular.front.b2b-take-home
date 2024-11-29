import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { ROUTE_CONFIG } from '../../../core/infra/config/routes.config';
import { Credentials } from '../domain/entities/credentials';
import { LoginRepository } from '../domain/repositories/login.repository';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  readonly #router = inject(Router);
  readonly #repository = inject(LoginRepository);
  readonly #serviceAuth = inject(AuthService);

  execute(credentials: Credentials): Observable<string> {
    try {
      if (!credentials.username) {
        throw new Error('El correo electrónico es requerido');
      }

      return this.#repository.authenticate(credentials).pipe(
        tap((token) => {
          this.#serviceAuth.saveAuthToken(token);
          this.#router.navigate([ROUTE_CONFIG.app, ROUTE_CONFIG.home]);
        }),

        take(1)
      );
    } catch (error) {
      console.warn(error);

      throw error;
    }
  }
}
