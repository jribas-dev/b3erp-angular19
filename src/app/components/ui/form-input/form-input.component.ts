import { CommonModule } from '@angular/common';
import { Component, Input, ContentChild, TemplateRef, computed, signal, HostListener } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputMaskHelper } from '../../../validations/custom-validators'; 

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'url';
export type FieldType = 'input' | 'textarea' | 'select';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css'
})
export class FormInputComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() type: InputType = 'text';
  @Input() control: FormControl = new FormControl('');
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() fieldType: FieldType = 'input';
  @Input() options?: { value: string; label: string }[] = [];
  @Input() helperText?: string;
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;
  @Input() maxLength?: number;
  @Input() mask?: string;

  // Template references para conteúdo personalizado
  @ContentChild('prefix') prefixTemplate?: TemplateRef<any>;
  @ContentChild('suffix') suffixTemplate?: TemplateRef<any>;

  // Usando sinais para propriedades reativas
  protected touched = signal(false);
  protected focused = signal(false);

  // Computed properties usando a API do Angular 19
  protected hasErrors = computed(() => {
    return this.control?.touched && this.control?.invalid;
  });

  protected fieldClasses = computed(() => {
    return {
      'w-full px-4 py-2 border rounded-xl shadow-sm transition': true,
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500': !this.disabled,
      'border-red-500': this.hasErrors(),
      'border-gray-300': !this.hasErrors(),
      'bg-gray-100 text-gray-500 cursor-not-allowed': this.disabled,
      'pl-10': this.prefixIcon || this.prefixTemplate,
      'masked': this.mask !== undefined
    };
  });

  onFocus(): void {
    this.focused.set(true);
    this.touched.set(true);
  }

  onBlur(): void {
    this.focused.set(false);
    this.control.markAsTouched();
  }
  
  // Manipulação de máscara para os inputs
  onInput(event: Event): void {
    if (!this.mask) return;
    
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/\D/g, ''); // Remove não-dígitos
    const maskedValue = InputMaskHelper.applyMask(rawValue, this.mask);
    
    // Atualiza o valor no DOM e no FormControl sem criar um loop
    if (input.value !== maskedValue) {
      input.value = maskedValue;
      this.control.setValue(maskedValue, { emitEvent: false });
    }
  }
  
  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';
    
    if (this.control.errors['required']) return 'Este campo é obrigatório.';
    if (this.control.errors['email']) return 'E-mail inválido.';
    if (this.control.errors['minlength'])
      return `Mínimo de ${this.control.errors['minlength'].requiredLength} caracteres.`;
    if (this.control.errors['maxlength'])
      return `Máximo de ${this.control.errors['maxlength'].requiredLength} caracteres.`;
    if (this.control.errors['pattern']) return 'Formato inválido.';
    if (this.control.errors['mask']) return 'Valor não corresponde ao formato requerido.';
    
    // Validações específicas
    if (this.control.errors['cpf']) return 'CPF inválido.';
    if (this.control.errors['cnpj']) return 'CNPJ inválido.';
    if (this.control.errors['phone']) return 'Telefone inválido.';
    
    return 'Valor inválido.';
  }
}