import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputModel } from '../../../../core/models/form-input.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss'
})
export class InputSelectComponent {
  @Input() inputData: FormInputModel;
  @Input() form: FormGroup;
  @Input() formCtrl: FormControl;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();

  changeValue(event: any) {
    this.valueChanged.emit(event);
  }
}
