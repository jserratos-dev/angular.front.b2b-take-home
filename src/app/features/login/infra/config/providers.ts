import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { LoginUseCase } from '../../application/login.usecase';
import { LoginRepository } from '../../domain/repositories/login.repository';
import { LocalLogin } from '../repositories/local-login';
import { LogoutRepository } from '../../domain/repositories/logout.repository';
import { LocalLogoutRepository } from '../repositories/local-logout';
import { LogoutUseCase } from '../../application/logout.usecase';

export function provideLogin(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LoginRepository,
      useClass: LocalLogin,
    },
    {
      provide: LogoutRepository,
      useClass: LocalLogoutRepository,
    },
    LoginUseCase,
    LogoutUseCase,
  ]);
}
