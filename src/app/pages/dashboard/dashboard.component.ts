import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { ChipLabelComponent } from '../../shared/components/chip-label/chip-label.component';
import { DashboardSummaryCardModel } from '../../core/models/dashboard-summary-card.model';
import { summaryCardData } from '../../core/data/summary-card';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { barChartConfiguration } from '../../core/data/bar-chart';
import { getPieChartData } from '../../core/data/pie-chart';
import { bulletChartData } from '../../core/data/bullet-chart';
import { TableComponent } from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/forms/button/button.component';
import { PopupStoreService } from '../../shared/components/popup/popup-store-service/popup-store.service';
import { AddTransactionComponent } from '../../shared/components/add-transaction/add-transaction.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ChipLabelComponent,
    AgChartsAngularModule,
    ChartComponent,
    TableComponent,
    ButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  cardData: DashboardSummaryCardModel[] = [];
  public chartOptions: any = barChartConfiguration();
  public pieChartData: any = getPieChartData();
  public bulletChartData: any = bulletChartData();
  constructor(
    public _popupStoreService: PopupStoreService
  ) {

  }

  showPopup() {

    this._popupStoreService.open(
      {
        component: AddTransactionComponent,
        title: 'Add Transaction',
      }
    )
  }
  ngOnInit() {
    for (const item of summaryCardData) {
      this.cardData.push(new DashboardSummaryCardModel(item.title, item.current_month, item.last_month, item.income))
    }
  }


}




