import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/forms/button/button.component';
import { InputTextComponent } from '../../shared/components/forms/input-text/input-text.component';
import { FormInputModel } from '../../core/models/form-input.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../core/services/authorization/authorization.service';
import { TransactionService } from '../../core/services/transaction/transaction.service';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputTextComponent,
    ReactiveFormsModule
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  @ViewChild('container') container: ElementRef;
  form: FormGroup;
  registerForm: FormGroup;
  formInputsLogin: FormInputModel[] = [
    new FormInputModel("Email", "email",  'email', [], 'Email'),
    new FormInputModel("Password", "password",  'password', [], 'Password'),
  ];

  formInputsRegister: FormInputModel[] = [
    new FormInputModel("Email", "email",  'email', [], 'Email'),
    new FormInputModel("Password", "password",  'password', [], 'Password'),
    new FormInputModel("Confirm Password", "confirm_password",  'password', [], 'Confirm Password'),
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _authorizationService: AuthorizationService,
    private _transactionService: TransactionService
  ) {
    this.form = this._formBuilder.group({})
    this.registerForm = this._formBuilder.group({})
    this.generateFormControls();
  }

  generateFormControls():void {
    for (const formInput of this.formInputsLogin) {
      this.form.addControl(formInput.id, new FormControl("", [Validators.required]))
    }
    for (const formInput of this.formInputsRegister) {
      this.registerForm.addControl(formInput.id, new FormControl("", Validators.required))
    }
  }


  onSubmitSignIn(): void {

  }


  register() {
    this.container.nativeElement.classList.add("active")
  }

  login() {
    this.container.nativeElement.classList.remove("active")
  }
}
