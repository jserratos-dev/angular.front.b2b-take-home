import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_CONFIG } from '../../../core/infra/config/routes.config';
import { LogoutRepository } from '../domain/repositories/logout.repository';

@Injectable({
  providedIn: 'root',
})
export class LogoutUseCase {
  readonly #router = inject(Router);
  readonly #repository = inject(LogoutRepository);

  execute(): void {
    this.#repository.logout().subscribe(() => {
      this.#router.navigate([ROUTE_CONFIG.login]); 
    });
  }
}
