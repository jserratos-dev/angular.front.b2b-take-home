import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authProtectedGuardGuard } from './auth-protected-guard.guard';

describe('authProtectedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authProtectedGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
