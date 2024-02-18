import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { TRANSACTIONS_DB } from '../../data/firebase-databases';
import * as _ from 'lodash';
import moment from 'moment';
import { DashboardSummaryCardModel } from '../../models/dashboard-summary-card.model';
import { DEFAULT_DATA } from '../../data/transaction-form';
import { TransactionModel } from '../../models/transaction.model';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  firestore = inject(Firestore);
  transactionCollection = collection(
    this.firestore,
    TRANSACTIONS_DB
  ) as CollectionReference<any>;
  transactions: WritableSignal<TransactionModel[]> = signal([]);
  transactionsUser: WritableSignal<string> = signal('all');
  transactionsReadOnly: WritableSignal<TransactionModel[]> = signal([]);

  transactionsGroupByMonth = computed(() => {
    if (this.transactions().length > 0) {
      const groupedByMonth = _.groupBy(this.transactions(), (transaction: TransactionModel) => {
        return this.defaultMonthFormat((moment(transaction.transaction_date).startOf('month'))); // Group by year and month
      });
      return this.mapLastSixMonthsEmptyData(groupedByMonth);
    }
    return [];
  })


  transactionSummaryCardData = computed(() => {
    const currentMonth = this.defaultMonthFormat(moment().startOf('month'));
    const lastMonth = this.defaultMonthFormat(moment().subtract(1, 'month').startOf('month'));
    const currentTransactionData = this.transactionsGroupByMonth()[currentMonth] || [];
    const lastTransactionData = this.transactionsGroupByMonth()[lastMonth] || [];
     const summaryData = {
        current: {
          totalIncome: 0,
          totalSavingsAmount: 0,
          totalChequingsAmount: 0,
          totalExpense: 0,
          totalCreditCardExpense: 0
        },
        last: {
          totalIncome: 0,
          totalSavingsAmount: 0,
          totalChequingsAmount: 0,
          totalExpense: 0,
          totalCreditCardExpense: 0
        },
      }
    if(currentTransactionData?.length || lastTransactionData?.length ) {
      this.setMonthSummary(currentTransactionData, summaryData['current'])
      this.setMonthSummary(lastTransactionData, summaryData['last']);
    }

    return [
      new DashboardSummaryCardModel("TOTAL INCOME", summaryData['current']['totalIncome'], summaryData['last']['totalIncome'], true),
      new DashboardSummaryCardModel("SAVINGS ACCOUNT", summaryData['current']['totalSavingsAmount'], summaryData['last']['totalSavingsAmount'], true),
      new DashboardSummaryCardModel("CHEQUING ACCOUNT", summaryData['current']['totalChequingsAmount'], summaryData['last']['totalChequingsAmount'], true),
      new DashboardSummaryCardModel("TOTAL EXPENSES", summaryData['current']['totalExpense'], summaryData['last']['totalExpense'], false),
      new DashboardSummaryCardModel("TOTAL CREDIT CARD EXPENSE", summaryData['current']['totalCreditCardExpense'], summaryData['last']['totalCreditCardExpense'], false),
    ];
  })


  setMonthSummary(transactions: any[] , summaryData: any) {
    transactions.forEach(transaction => {
      if (transaction.account_type != DEFAULT_DATA.CREDIT_CARD) {
        if (transaction.transaction_type == DEFAULT_DATA.INCOME ) {
          summaryData['totalIncome'] += parseFloat(transaction.amount)
          this.setTotalSavingsAndChequingSummary(transaction, summaryData);
        } else if(transaction.transaction_type == DEFAULT_DATA.EXPENSE) {
          summaryData['totalExpense'] += parseFloat(transaction.amount)
          this.setTotalSavingsAndChequingSummary(transaction, summaryData);
        } else if (transaction.transaction_type == DEFAULT_DATA.FUND_TRANSFER) {
          let accountTransferred = transaction.account_type == DEFAULT_DATA.SAVINGS ? 'totalChequingsAmount' : 'totalSavingsAmount';
          let account = transaction.account_type == DEFAULT_DATA.SAVINGS ? 'totalSavingsAmount' : 'totalChequingsAmount';
           summaryData[account] -= parseFloat(transaction.amount);
           summaryData[accountTransferred] += parseFloat(transaction.amount);
        }
      } else {
        summaryData['totalCreditCardExpense'] += parseFloat(transaction.amount)
      }
    });
  }

  setTotalSavingsAndChequingSummary(transaction: any, summary: any) {
    if (transaction.account_type == DEFAULT_DATA.SAVINGS) {
      summary['totalSavingsAmount'] +=  (transaction.transaction_type == DEFAULT_DATA.INCOME ) ? parseFloat(transaction.amount) : (parseFloat(transaction.amount)* -1)
    } else {
      summary['totalChequingsAmount'] +=  (transaction.transaction_type == DEFAULT_DATA.INCOME ) ? parseFloat(transaction.amount) : (parseFloat(transaction.amount)* -1)
    }
  }

  mapLastSixMonthsEmptyData(groupedByMonth: any) {
    if (Object.keys(groupedByMonth).length < 6) {
     let emptyLength = 6 - Object.keys(groupedByMonth).length;
     for (let index = Object.keys(groupedByMonth).length ; index <= emptyLength; index++) {
      groupedByMonth[`${ this.defaultMonthFormat(moment().startOf('month').subtract(index, 'month'))}`] = []
     }
     return groupedByMonth;
    }
     return groupedByMonth;
  }


  defaultMonthFormat(date: any) {
    return moment(date).format('YYYY-MM-DD')
  }

  constructor() {
  }

  getLastSixMonthsTransactions() {
    collectionData(this.transactionCollection, {}).subscribe(data => {
      const filterDataMonth = moment().subtract(6, 'months').startOf('month');
      let transactions =  _.filter( _.map(_.orderBy(data, ['transaction_date'], ['desc']), (transaction: any) => new TransactionModel(transaction)), (transaction: TransactionModel) => {
        const transactionDate = moment(transaction.transaction_date);
        return transactionDate.isAfter(filterDataMonth);
      });
      this.transactionsReadOnly.set(JSON.parse(JSON.stringify(transactions)))
      this.changeUserTransaction(this.transactionsUser())
    })
  }

  addTransaction(newTransaction:any) {
    return addDoc(this.transactionCollection, { ...newTransaction });
  }

  async deleteTransaction(id: string) {
    const docRef = doc(this.firestore, TRANSACTIONS_DB, id);
    await deleteDoc(docRef);
  }

  changeUserTransaction(user: string): void {
    if (user == 'all') {
      this.transactions.set(JSON.parse(JSON.stringify(this.transactionsReadOnly())))
    } else {
      const transactions = _.filter(JSON.parse(JSON.stringify(this.transactionsReadOnly())), { 'transaction_for': user })
      this.transactions.set(transactions);
    }
  }

}

