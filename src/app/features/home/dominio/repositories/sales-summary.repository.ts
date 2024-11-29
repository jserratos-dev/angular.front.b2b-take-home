import { Observable } from "rxjs";
import { ISale } from "../entities/sale";

export abstract class SalesSummaryRepository {
    abstract getAllSales(): Observable<ISale[]>;
  }