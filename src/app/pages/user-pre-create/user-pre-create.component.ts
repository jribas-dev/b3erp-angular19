import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { FormInputComponent } from '../../components/ui/form-input/form-input.component';
import {
  CustomValidators,
  InputMaskHelper,
} from '../../validations/custom-validators';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-pre-create',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormInputComponent],
  templateUrl: './user-pre-create.component.html',
  styleUrl: './user-pre-create.component.css'
})
export class UserPreCreateComponent {
  cadastroForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, CustomValidators.cpf()]],
      telefone: ['', [Validators.required, CustomValidators.phone()]],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.strongPassword(),
        ],
      ],
      confirmaSenha: [
        '',
        [Validators.required, CustomValidators.matchValues('senha')],
      ],
    });
    // Atualizando a validação de confirmação de senha quando a senha muda
    this.cadastroForm.get('senha')?.valueChanges.subscribe(() => {
      this.cadastroForm.get('confirmaSenha')?.updateValueAndValidity();
    });
  }

  getControl(prop: string): FormControl {
    return this.cadastroForm.get(prop) as FormControl;
  }

  // Implementação de máscara para CPF e telefone (em um aplicativo real, isso seria uma diretiva)
  onInputMask(event: Event, mask: string): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove não-dígitos
    input.value = InputMaskHelper.applyMask(value, mask);
  }

  togglePasswordVisibility(field: 'senha' | 'confirmaSenha'): void {
    if (field === 'senha') {
      this.showPassword = !this.showPassword;
      const passwordField = document.getElementById(
        'senha'
      ) as HTMLInputElement;
      passwordField.type = this.showPassword ? 'text' : 'password';
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
      const confirmField = document.getElementById(
        'confirmaSenha'
      ) as HTMLInputElement;
      confirmField.type = this.showConfirmPassword ? 'text' : 'password';
    }
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      console.log('Formulário enviado com sucesso:', this.cadastroForm.value);
      // Aqui você implementaria o envio do formulário para seu backend
    } else {
      console.log('Formulário inválido:', this.cadastroForm.errors);
      // Marca todos os campos como touched para exibir os erros
      Object.keys(this.cadastroForm.controls).forEach((key) => {
        const control = this.cadastroForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
