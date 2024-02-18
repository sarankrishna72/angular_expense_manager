import { Component } from '@angular/core';
import { InputTextComponent } from '../forms/input-text/input-text.component';
import { InputSelectComponent } from '../forms/input-select/input-select.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputModel } from '../../../core/models/form-input.model';
import { AccountTypeData, CategoryTypeData, CountryData, DEFAULT_DATA, LocationData, TransactionForData, TransactionTypeData } from '../../../core/data/transaction-form';
import { ButtonComponent } from '../forms/button/button.component';
import { InputTextareaComponent } from '../forms/input-textarea/input-textarea.component';
import { TransactionService } from '../../../core/services/transaction/transaction.service';
import { PopupStoreService } from '../popup/popup-store-service/popup-store.service';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    InputTextComponent,
    InputSelectComponent,
    InputTextareaComponent,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss'
})
export class AddTransactionComponent {
  form: FormGroup;

  formInputs: FormInputModel[] = [
    new FormInputModel("Transaction Date", "transaction_date",  'date', [], 'MM/DD/YYYY'),
    new FormInputModel("Category Type", "category_type", 'select', CategoryTypeData, 'Select Category Type', DEFAULT_DATA.FOOD),
    new FormInputModel("Transaction Type", "transaction_type", 'select', TransactionTypeData, 'Select Transaction Type', DEFAULT_DATA.INCOME),
    new FormInputModel("Transaction Made By", "transaction_for", 'select', TransactionForData, 'Select User', DEFAULT_DATA.DEVIKA),
    new FormInputModel("Account Type", "account_type", 'select', AccountTypeData, 'Select Account', DEFAULT_DATA.CHEQUINGS),
    new FormInputModel("Country", "country", 'select', CountryData, 'Select Country', DEFAULT_DATA.CANADA),
    new FormInputModel("Location", "location", 'select', LocationData, 'Select Location', DEFAULT_DATA.MISSISSUAGA),
    new FormInputModel("Amount", "amount",'number', [], 'Enter amount'),
    new FormInputModel("Comment", "comment",'textarea', [], 'Enter a comment'),
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _transactionService: TransactionService,
    private _popupStoreService: PopupStoreService
  ) {
    this.form = this._formBuilder.group({})
    this.generateFormControls();
  }

  onSubmitData(): void {
    let data = this.form.value;
    data['amount'] = parseFloat(data['amount']);
    this._transactionService.addTransaction(
      data
    );
    this._popupStoreService.dismiss()
  }

  generateFormControls():void {
    for (const formInput of this.formInputs) {
      this.form.addControl(formInput.id, new FormControl(formInput.value, [Validators.required]))
    }
  }
}
