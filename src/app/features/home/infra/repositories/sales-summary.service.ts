import { inject, Injectable } from '@angular/core';
import { SalesSummaryRepository } from '../../dominio/repositories/sales-summary.repository';
import { Observable } from 'rxjs';
import { ISale } from '../../dominio/entities/sale';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesSummaryService extends SalesSummaryRepository  {
  
  private dbPath = 'assets/db.json';
  readonly #http = inject(HttpClient)

  getAllSales(): Observable<ISale[]> {
      return this.#http.get<ISale[]>(this.dbPath);
  }
}

