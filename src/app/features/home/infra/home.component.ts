import { Component } from '@angular/core';
import { SalesSummaryComponent } from './components/sales-summary/sales-summary.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [SalesSummaryComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
