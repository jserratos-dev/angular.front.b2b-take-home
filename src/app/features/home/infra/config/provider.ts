import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { SalesSummaryRepository } from '../../dominio/repositories/sales-summary.repository';
import { SalesSummaryService } from '../repositories/sales-summary.service';
import { SaleSummaryUseCase } from '../../application/sale-summary.usecase';

export function provideHome(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
        provide: SalesSummaryRepository,
        useClass: SalesSummaryService ,
    },
    SaleSummaryUseCase,
  ]);
}
