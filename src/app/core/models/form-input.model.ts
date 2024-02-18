
export class FormInputModel {
  label: string = '';
  id: string = '';
  validation?: FormValidation;
  required: boolean = false;
  pattern: string | null = null;
  type: string = 'text';
  placeholder: string = 'enter a input';
  value: string | null = null;
  options ?: ListInterfaceModel[] | never[] = [];
  constructor(label: string, id: string, type: string, options:ListInterfaceModel[] = [], placeholder?: string, value ?: string, validation ?: FormValidation) {
    this.label = label;
    this.validation = validation;
    this.type = type;
    this.id = id;
    this.value = value || null;
    this.options = options;
    this.placeholder = placeholder || 'enter a input';
  }
}


export interface FormValidation {
  required ?: boolean;
  pattern ?: string;
}


export class ListInterfaceModel {
  id! : string;
  name! :string;

  constructor({id = '', name = ''}) {
    this.id = id;
    this.name = name;
  }
}
