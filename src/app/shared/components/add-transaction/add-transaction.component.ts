import { Component, Input, SimpleChanges } from '@angular/core';
import { InputTextComponent } from '../forms/input-text/input-text.component';
import { InputSelectComponent } from '../forms/input-select/input-select.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputModel } from '../../../core/models/form-input.model';
import { AccountTypeData, CategoryTypeData, CountryData, DEFAULT_DATA, LocationData, TransactionForData, TransactionTypeData } from '../../../core/data/transaction-form';
import { ButtonComponent } from '../forms/button/button.component';
import { InputTextareaComponent } from '../forms/input-textarea/input-textarea.component';
import { TransactionService } from '../../../core/services/transaction/transaction.service';
import { PopupStoreService } from '../popup/popup-store-service/popup-store.service';
import Swal from 'sweetalert2';
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
  @Input() editData: any;
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
  }

  onSubmitData(): void {
    let data = this.form.value;
    data['amount'] = parseFloat(data['amount']);
    let actionPromise: Promise<any>;
    if (this.editData) {
      actionPromise = this._transactionService.updateTransaction(this.editData.id, data)
    } else {
      actionPromise = this._transactionService.addTransaction(data);
    }

   actionPromise.then((trans) => {
      this._transactionService.getLastSixMonthsTransactions();
      this._transactionService.showToast( this.editData ? "Transaction updated successfully" : "Transaction created successfully", "success");
    }).catch((error) => {
       this._transactionService.showToast("Something went wrong", "error");
    });
    this._popupStoreService.dismiss()
  }





  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.generateFormControls();

  }

  generateFormControls():void {
    for (const formInput of this.formInputs) {
      this.form.addControl(formInput.id, new FormControl(this.editData?.[formInput.id] || formInput.value, [Validators.required]))
    }
  }
}
