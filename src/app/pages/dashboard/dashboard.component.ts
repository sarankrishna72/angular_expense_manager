import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { ChipLabelComponent } from '../../shared/components/chip-label/chip-label.component';
import { DashboardSummaryCardModel } from '../../core/models/dashboard-summary-card.model';
import { summaryCardData } from '../../core/data/summary-card';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { barChartForIncomeVsExpenseConfiguration } from '../../core/data/bar-chart';
import { getPieChartData } from '../../core/data/pie-chart';
import { bulletForUserIncomeChartData } from '../../core/data/bullet-chart';
import { TableComponent } from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/forms/button/button.component';
import { PopupStoreService } from '../../shared/components/popup/popup-store-service/popup-store.service';
import { AddTransactionComponent } from '../../shared/components/add-transaction/add-transaction.component';
import { TransactionService } from '../../core/services/transaction/transaction.service';
import * as _ from 'lodash';
import moment from 'moment';
import { DEFAULT_DATA, TransactionForData } from '../../core/data/transaction-form';
import { TRANSACTION_TABLE_COLUMNS } from '../../core/data/transaction-table-col';
import { totalAccountTypeExpenseCalculation } from '../../core/data/area-chart';
import { FormInputModel } from '../../core/models/form-input.model';
import { InputSelectComponent } from '../../shared/components/forms/input-select/input-select.component';


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
    ButtonComponent,
    InputSelectComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  cardData: DashboardSummaryCardModel[] = [];
  public chartOptions: any = barChartForIncomeVsExpenseConfiguration([]);
  public pieChartData: any = getPieChartData([]);
  public bulletChartData: any = bulletForUserIncomeChartData([]);
  public areaChartData: any = totalAccountTypeExpenseCalculation([]);
  public _transactionService = inject(TransactionService);
  transactionTableColumns = TRANSACTION_TABLE_COLUMNS;
  userFormCtrl = new FormControl('all');
  userFormCtrlData = new FormInputModel("Users", "transaction_for", 'select', [...[{id: 'all', name: 'All'}], ...TransactionForData], 'Select User', "all")

  effect = effect(() => {

    if (this._transactionService.transactions().length > 0) {
      let data = [];
      let categoryData = [];
      let targetData = []
      let currentMonthData = [];
      let areaChartData = [];
      for (const key of Object.keys(this._transactionService.transactionsGroupByMonth())) {
        if (key == this._transactionService.defaultMonthFormat(moment().startOf('month'))) {
          currentMonthData = this._transactionService.transactionsGroupByMonth()[key]
        }
        const month = moment(key).format('MMM')
        const incomes = this._transactionService.transactionsGroupByMonth()[key].filter(transaction => transaction.transaction_type ==  DEFAULT_DATA.INCOME && transaction.category_type != DEFAULT_DATA.FUND_TRANSFER)
        const totalSarathIncomes = _.filter(incomes, { 'transaction_for': DEFAULT_DATA.SARATH });
        const totalDevikaIncomes = _.filter(incomes, { 'transaction_for': DEFAULT_DATA.DEVIKA  });
        const expenses = _.filter(this._transactionService.transactionsGroupByMonth()[key], { 'transaction_type': DEFAULT_DATA.EXPENSE });
        const totalIncome = _.sumBy(incomes, 'amount');
        const totalExpense = _.sumBy(expenses, 'amount');
        targetData.unshift({month, totalSarathIncomes: _.sumBy(totalSarathIncomes, 'amount'), totalDevikaIncomes: _.sumBy(totalDevikaIncomes, 'amount') })
        data.unshift({month, totalIncome, totalExpense})

        areaChartData.unshift({
          month,
          chequings_account: _.sumBy(_.filter(expenses, { 'account_type': DEFAULT_DATA.CHEQUINGS }), 'amount'),
          savings_account: _.sumBy(_.filter(expenses, { 'account_type': DEFAULT_DATA.SAVINGS }), 'amount'),
          credits_account: _.sumBy(_.filter(expenses, { 'account_type': DEFAULT_DATA.CREDIT_CARD }), 'amount'),
        });

      }
      if (currentMonthData.length) {
        const expenses = _.filter(currentMonthData, { 'transaction_type': DEFAULT_DATA.EXPENSE });
        const expensesByCategory = _.groupBy(expenses, 'category_type');
        categoryData = _.map(expensesByCategory, (categoryExpenses, categoryName) => {
          return {
            category: categoryName,
            amount: _.sumBy(categoryExpenses, 'amount')
          };
        });
      }
      this.chartOptions = barChartForIncomeVsExpenseConfiguration(data)
      this.pieChartData = getPieChartData(categoryData);
      this.bulletChartData = bulletForUserIncomeChartData(targetData);
      this.areaChartData = totalAccountTypeExpenseCalculation(areaChartData);
    } else {

      this.chartOptions = barChartForIncomeVsExpenseConfiguration([])
      this.pieChartData = getPieChartData([]);
      this.bulletChartData = bulletForUserIncomeChartData([]);
      this.areaChartData = totalAccountTypeExpenseCalculation([]);
    }
  });

  constructor(
    public _popupStoreService: PopupStoreService,
  ) {
  }



  changeUser(event: any) {
    this._transactionService.transactionsUser.set(this.userFormCtrl.value);
    this._transactionService.changeUserTransaction(this._transactionService.transactionsUser());
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
    if (this._transactionService.transactions().length === 0) {
      this._transactionService.getLastSixMonthsTransactions();
    }
  }


}




