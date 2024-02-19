import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
import moment from 'moment';
import { AccountTypeData, CategoryTypeData, DEFAULT_DATA, MonthList, TransactionForData, TransactionTypeData } from '../../core/data/transaction-form';
import { TRANSACTION_TABLE_COLUMNS } from '../../core/data/transaction-table-col';
import { totalAccountTypeExpenseCalculation } from '../../core/data/area-chart';
import { FormInputModel } from '../../core/models/form-input.model';
import { InputSelectComponent } from '../../shared/components/forms/input-select/input-select.component';
import { TransactionModel } from '../../core/models/transaction.model';
import { sumBy, filter, map, groupBy } from 'lodash';


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
  userFormCtrl: FormControl = new FormControl('all');
  userFormCtrlData = new FormInputModel("Users", "transaction_for", 'select', [...[{id: 'all', name: 'All'}], ...TransactionForData], 'Select User', "all")
  filterForm: FormGroup = new FormGroup({});
  filtersData: any[] = [];
  tableData: any[] = [];
  effect = effect(() => {

    if (this._transactionService.transactions().length > 0) {
      this.setFilterData();
      let data = [];
      let categoryData: any[] = [];
      let targetData: any[] = []
      let currentMonthData: any[] = [];
      let areaChartData: any[] = [];
      for (const key of Object.keys(this._transactionService.transactionsGroupByMonth())) {
        if (key == this._transactionService.defaultMonthFormat(moment().startOf('month'))) {
          currentMonthData = this._transactionService.transactionsGroupByMonth()[key]
        }
        const month = moment(key).format('MMM')
        const incomes = this._transactionService.transactionsGroupByMonth()[key].filter((transaction: TransactionModel) => transaction.transaction_type ==  DEFAULT_DATA.INCOME && transaction.category_type != DEFAULT_DATA.FUND_TRANSFER)
        const totalSarathIncomes = filter(incomes, { 'transaction_for': DEFAULT_DATA.SARATH });
        const totalDevikaIncomes = filter(incomes, { 'transaction_for': DEFAULT_DATA.DEVIKA  });
        const expenses = filter(this._transactionService.transactionsGroupByMonth()[key], { 'transaction_type': DEFAULT_DATA.EXPENSE });
        const totalIncome = sumBy(incomes, 'amount');
        const totalExpense = sumBy(expenses, 'amount');
        targetData.unshift({month, totalSarathIncomes: sumBy(totalSarathIncomes, 'amount'), totalDevikaIncomes: sumBy(totalDevikaIncomes, 'amount') })
        data.unshift({month, totalIncome, totalExpense})

        areaChartData.unshift({
          month,
          chequings_account: sumBy(filter(expenses, { 'account_type': DEFAULT_DATA.CHEQUINGS }), 'amount'),
          savings_account: sumBy(filter(expenses, { 'account_type': DEFAULT_DATA.SAVINGS }), 'amount'),
          credits_account: sumBy(filter(expenses, { 'account_type': DEFAULT_DATA.CREDIT_CARD }), 'amount'),
        });

      }
      if (currentMonthData.length) {
        const expenses = filter(currentMonthData, { 'transaction_type': DEFAULT_DATA.EXPENSE });
        const expensesByCategory = groupBy(expenses, 'category_type');
        categoryData = map(expensesByCategory, (categoryExpenses, categoryName) => {
          return {
            category: categoryName,
            amount: sumBy(categoryExpenses, 'amount')
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
    private _formBuilder: FormBuilder
  ) {

    this.filterForm = _formBuilder.group({
      category_type: new FormControl("all"),
      account_type: new FormControl("all"),
      transaction_type: new FormControl("all"),
      transaction_date:  new FormControl("all"),
    });
    this.filtersData = [
      new FormInputModel("Category Type", "category_type", 'select', [...[{id: 'all', name: 'All'}], ...CategoryTypeData], 'Select Category', "all"),
      new FormInputModel("Account Type", "account_type", 'select', [...[{id: 'all', name: 'All'}], ...AccountTypeData], 'Select Account', "all"),
      new FormInputModel("Transaction Type", "transaction_type", 'select', [...[{id: 'all', name: 'All'}], ...TransactionTypeData], 'Select Transaction Type', "all"),
      new FormInputModel("Month", "transaction_date", 'select', MonthList, 'Select Range', "all")
    ]
  }


  setFilterData() {
    let data =  JSON.parse(JSON.stringify(this._transactionService.transactions()))
    let filterObj: any = {}
    for (const item of  this.filtersData) {
      if (this.filterForm['value'][item.id] != 'all' && item.id != 'transaction_date') {
        filterObj[item.id] = this.filterForm['value'][item.id];
      }
    }
    this.tableData = filter(data, filterObj);
    this.changeMonth();
  }

  tableActionsCTA(event: any): void {
    switch (event.action) {
      case 'add':
        this.showPopup();
        break;
      case 'edit':
        this.showPopup(event.data);
      break;
      case 'delete':
        this.showPopup();
      break;
      default:
        break;
    }
  }

  resetFilter() {
    this.filterForm.patchValue({
      "category_type": "all",
      "account_type": "all",
      "transaction_type": "all",
    });
  }

  changeMonth() {
    let month = this.filterForm.value['transaction_date'];
    let startDate: any, endDate: any;
    switch (month) {
      case DEFAULT_DATA.last_month:
        startDate = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
        endDate = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
        break;
      case DEFAULT_DATA.last_2_months:
        startDate = moment().subtract(2, 'months').startOf('month').format('YYYY-MM-DD');
        endDate = moment().subtract(2, 'months').endOf('month').format('YYYY-MM-DD');
        break;
      case DEFAULT_DATA.last_3_months:
        startDate = moment().subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
        endDate = moment().subtract(3, 'months').endOf('month').format('YYYY-MM-DD');
        break;
      case DEFAULT_DATA.last_4_months:
        startDate = moment().subtract(4, 'months').startOf('month').format('YYYY-MM-DD');
        endDate = moment().subtract(4, 'months').endOf('month').format('YYYY-MM-DD');
        break;
      }
    if (startDate && endDate) {
      let data = filter(this.tableData, (transaction: TransactionModel) => {
        const transactionDate = moment(transaction.transaction_date);
        return transactionDate.isBetween(startDate, endDate, null, '[]'); // '[]' includes the start and end dates
      });
      this.tableData = data;
    }
  };



  changeUser(event: any) {
    let data = this.userFormCtrl.value;
    if (this._transactionService.transactionsUser() != data) {
      this.resetFilter();
      this._transactionService.transactionsUser.set(this.userFormCtrl.value);
      this._transactionService.changeUserTransaction(this._transactionService.transactionsUser());
    }
  }

  showPopup(data ?:any) {
    this._popupStoreService.open(
      {
        component: AddTransactionComponent,
        title: 'Add Transaction',
        componentProps: {
          editData: data || null
        }
      }
    )
  }
  ngOnInit() {
    if (this._transactionService.transactions().length === 0) {
      this._transactionService.getLastSixMonthsTransactions();
    }
  }


}




