import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  booleanAttribute,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-input.component.html',
})
export class PasswordInputComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() error?: string;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) showStrengthMeter = false;
  @Output() valueChange = new EventEmitter<string>();

  showPassword = false;

  get value(): string {
    return this.control.value;
  }

  calculatePasswordStrength(password: string): number {
    if (!password) return 0;

    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;

    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

    return Math.min(strength, 5);
  }

  get passwordStrength(): number {
    return this.calculatePasswordStrength(this.value);
  }

  get strengthLabels(): string[] {
    return ['Muito fraca', 'Fraca', 'Média', 'Boa', 'Forte', 'Excelente'];
  }

  get strengthColors(): string[] {
    return [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-yellow-300',
      'bg-green-400',
      'bg-green-600',
    ];
  }

  hasError(): boolean {
    return this.control?.touched && this.control?.invalid;
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
    return 'Valor inválido.';
  }
}
