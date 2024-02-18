import moment from "moment";
import { DEFAULT_DATA } from "../data/transaction-form";

export class TransactionModel {
  transaction_date: string;
  category_type: string;
  transaction_type: string;
  transaction_for: string;
  account_type: string;
  country : string;
  location: string;
  amount: number;
  comment: string;
  amount_in_cad: string
  transaction_date_formatted: string
  constructor({transaction_date = "", category_type ="", transaction_type = "", transaction_for = "", account_type = "", country = "", location = "", amount = 0, comment = ""}) {
    this.transaction_date = transaction_date || '';
    this.category_type = category_type || '';
    this.transaction_type = transaction_type || '';
    this.transaction_for = transaction_for || '';
    this.account_type = account_type || '';
    this.country = country || '';
    this.location = location || '';
    this.amount = amount || 0;
    this.comment = comment || '';
    this.amount_in_cad = this.formatAmount();
    this.transaction_date_formatted = this.formatTransactionDate();
  }


  formatTransactionDate() {
    return moment(this.transaction_date).format('DD-MMM-YYYY')
  }

  formatAmount(): string {
    return `<div class="${this.transaction_type == DEFAULT_DATA.EXPENSE ? 'text-color-1' : this.transaction_type == DEFAULT_DATA.INCOME ? 'text-color-7': '' }">${this.transaction_type == DEFAULT_DATA.EXPENSE ? '-' : this.transaction_type == DEFAULT_DATA.INCOME ? '+': ''} $${this.amount.toFixed(2)}</div>`
  }

}
