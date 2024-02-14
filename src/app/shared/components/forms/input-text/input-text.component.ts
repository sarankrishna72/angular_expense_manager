import { Component, Input } from '@angular/core';
import { FormInputModel } from '../../../../core/models/form-input.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input() inputData: FormInputModel;
  @Input() form: FormGroup;
}
