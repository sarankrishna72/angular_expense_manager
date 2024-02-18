import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormInputModel } from '../../../../core/models/form-input.model';

@Component({
  selector: 'app-input-textarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-textarea.component.html',
  styleUrl: './input-textarea.component.scss'
})
export class InputTextareaComponent {
  @Input() inputData!: FormInputModel;
  @Input() form!: FormGroup;
}
