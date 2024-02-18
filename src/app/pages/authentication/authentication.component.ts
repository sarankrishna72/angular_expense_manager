import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/forms/button/button.component';
import { InputTextComponent } from '../../shared/components/forms/input-text/input-text.component';
import { FormInputModel } from '../../core/models/form-input.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../core/services/authorization/authorization.service';
import { TransactionService } from '../../core/services/transaction/transaction.service';
import { base64Encode } from '../../core/utils';
import { Router } from '@angular/router';

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

  constructor(
    private _formBuilder: FormBuilder,
    private _authorizationService: AuthorizationService,
    private _transactionService: TransactionService,
    private _router: Router
  ) {
    this.form = this._formBuilder.group({})
    this.registerForm = this._formBuilder.group({})
    this.generateFormControls();
  }

  generateFormControls():void {
    for (const formInput of this.formInputsLogin) {
      this.form.addControl(formInput.id, new FormControl("", [Validators.required]))
    }

  }


  onSubmitSignIn(): void {
    this._authorizationService.signIn(this.form.value).then(response => {
      localStorage.setItem("authorization", base64Encode(JSON.stringify(response.user)));
      this._router.navigate(['/']);
    })
  }


  login() {
    this.container.nativeElement.classList.remove("active")
  }
}
