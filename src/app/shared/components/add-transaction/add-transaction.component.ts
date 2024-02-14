import { Component } from '@angular/core';
import { InputTextComponent } from '../forms/input-text/input-text.component';
import { InputSelectComponent } from '../forms/input-select/input-select.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputModel, FormValidation } from '../../../core/models/form-input.model';
import { AccountTypeData, CategoryTypeData, CountryData, LocationData, TransactionTypeData } from '../../../core/data/transaction-form';
import { ButtonComponent } from '../forms/button/button.component';
import { InputTextareaComponent } from '../forms/input-textarea/input-textarea.component';

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
    new FormInputModel("Category Type", "category_type", 'select', CategoryTypeData, 'Select Category Type', 'Food'),
    new FormInputModel("Transaction Type", "transaction_type", 'select', TransactionTypeData, 'Select Transaction Type', 'Income'),
    new FormInputModel("Account Type", "account_type", 'select', AccountTypeData, 'Select Transaction Type', 'Savings'),
    new FormInputModel("Country", "country", 'select', CountryData, 'Select Country', 'Canada'),
    new FormInputModel("Location", "location", 'select', LocationData, 'Select Location', 'Mississauga'),
    new FormInputModel("Amount", "amount",'number', [], 'Enter amount'),
    new FormInputModel("Comment", "comment",'textarea', [], 'Enter a comment'),
  ];

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({})
    this.generateFormControls();
  }

  generateFormControls():void {
    for (const formInput of this.formInputs) {
      this.form.addControl(formInput.id, new FormControl(formInput.value))
    }
  }
}
