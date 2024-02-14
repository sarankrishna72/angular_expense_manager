export class FormInputModel {
  label: string = '';
  id: string = '';
  validation?: FormValidation;
  required: boolean = false;
  pattern: string = null;
  type: string = 'text';
  placeholder: string = 'enter a input';
  value: string = null;
  options: any[] = [];
  constructor(label: string, id: string, type: string, options = [], placeholder?: string, value ?: string, validation ?: FormValidation) {
    this.label = label;
    this.validation = validation;
    this.type = type;
    this.id = id;
    this.value = value;
    this.options = options;
    this.placeholder = placeholder || 'enter a input';
  }
}


export interface FormValidation {
  required ?: boolean;
  pattern ?: string;
}
