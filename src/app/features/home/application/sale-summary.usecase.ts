import { map, Observable } from "rxjs";
import { ISalesSummary } from "../dominio/entities/sales-summary";
import { SalesSummaryRepository } from "../dominio/repositories/sales-summary.repository";
import { ISale } from "../dominio/entities/sale";
import { inject } from "@angular/core";

export class SaleSummaryUseCase {

  readonly #repository = inject(SalesSummaryRepository);

  
    execute(): Observable<ISalesSummary> {
      return this.#repository.getAllSales().pipe(
        map((sales: ISale[]) => {
          const totalSales = sales.reduce((sum, sale) => sum + sale.price, 0);
          const totalOrders = sales.length;
          const averageTicket = totalOrders > 0 ? totalSales / totalOrders : 0;
  
          return {
            totalSales,
            totalOrders,
            averageTicket,
          };
        })
      );
    }
  }