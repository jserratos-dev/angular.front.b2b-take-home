import { Component, inject, OnInit } from '@angular/core';
import { ISalesSummary } from '../../../dominio/entities/sales-summary';
import { SaleSummaryUseCase } from '../../../application/sale-summary.usecase';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-sales-summary',
  standalone: true,
  imports: [CommonModule],
  providers:[CurrencyPipe],
  templateUrl: './sales-summary.component.html',
  styleUrl: './sales-summary.component.css'
})
export class SalesSummaryComponent implements OnInit {
  summary: ISalesSummary | null = null;
  private getSalesSummary = inject(SaleSummaryUseCase);

  ngOnInit() {
    this.getSalesSummary.execute().subscribe((summary) => (this.summary = summary));
  }

}
