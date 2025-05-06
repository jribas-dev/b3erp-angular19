import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  /**
   * Validador de CPF
   */
  static cpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      // Remove caracteres não numéricos
      const cpf = value.replace(/[^\d]/g, '');

      // Verifica se tem 11 dígitos
      if (cpf.length !== 11) {
        return { cpf: true };
      }

      // Verifica se todos os dígitos são iguais
      if (/^(\d)\1{10}$/.test(cpf)) {
        return { cpf: true };
      }

      // Validação do primeiro dígito verificador
      let soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
      }

      let resto = soma % 11;
      let dv1 = resto < 2 ? 0 : 11 - resto;

      if (parseInt(cpf.charAt(9)) !== dv1) {
        return { cpf: true };
      }

      // Validação do segundo dígito verificador
      soma = 0;
      for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
      }

      resto = soma % 11;
      let dv2 = resto < 2 ? 0 : 11 - resto;

      if (parseInt(cpf.charAt(10)) !== dv2) {
        return { cpf: true };
      }

      return null;
    };
  }

  /**
   * Validador de CNPJ
   */
  static cnpj(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      // Remove caracteres não numéricos
      const cnpj = value.replace(/[^\d]/g, '');

      // Verifica se tem 14 dígitos
      if (cnpj.length !== 14) {
        return { cnpj: true };
      }

      // Verifica se todos os dígitos são iguais
      if (/^(\d)\1{13}$/.test(cnpj)) {
        return { cnpj: true };
      }

      // Validação dos dígitos verificadores
      const tamanho = cnpj.length - 2;
      const numeros = cnpj.substring(0, tamanho);
      const digitos = cnpj.substring(tamanho);

      let soma = 0;
      let pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
      }

      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== parseInt(digitos.charAt(0))) {
        return { cnpj: true };
      }

      tamanho + 1;
      const numeros2 = cnpj.substring(0, tamanho + 1);
      soma = 0;
      pos = tamanho - 6;

      for (let i = tamanho + 1; i >= 1; i--) {
        soma += parseInt(numeros2.charAt(tamanho + 1 - i)) * pos--;
        if (pos < 2) pos = 9;
      }

      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== parseInt(digitos.charAt(1))) {
        return { cnpj: true };
      }

      return null;
    };
  }

  /**
   * Validador de telefone
   */
  static phone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      // Verifica o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
      const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
      if (!phoneRegex.test(value)) {
        return { phone: true };
      }

      return null;
    };
  }

  /**
   * Validador de CEP
   */
  static cep(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      // Verifica o formato XXXXX-XXX
      const cepRegex = /^\d{5}-\d{3}$/;
      if (!cepRegex.test(value)) {
        return { cep: true };
      }

      return null;
    };
  }

  /**
   * Validador de senha forte
   * Requer pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasMinLength = value.length >= 8;

      const passwordValid =
        hasUpperCase && hasLowerCase && hasNumeric && hasMinLength;

      if (!passwordValid) {
        return {
          strongPassword: {
            hasUpperCase,
            hasLowerCase,
            hasNumeric,
            hasMinLength,
          },
        };
      }

      return null;
    };
  }

  /**
   * Validador de confirmação de senha
   */
  static matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceValue = control.value;
      const targetControl = control.parent?.get(matchTo);
      const targetValue = targetControl?.value;

      if (sourceValue && targetValue && sourceValue !== targetValue) {
        return { mismatch: true };
      }

      return null;
    };
  }
}

/**
 * Classe utilitária para implementação de máscaras em inputs
 */
export class InputMaskHelper {
  static applyMask(value: string, mask: string): string {
    if (!value || !mask) return value;

    let result = '';
    let index = 0;

    for (let i = 0; i < mask.length && index < value.length; i++) {
      const maskChar = mask.charAt(i);

      if (maskChar === '0') {
        // Aceita apenas números
        if (/\d/.test(value.charAt(index))) {
          result += value.charAt(index);
          index++;
        }
      } else if (maskChar === 'A') {
        // Aceita apenas letras
        if (/[a-zA-Z]/.test(value.charAt(index))) {
          result += value.charAt(index);
          index++;
        }
      } else if (maskChar === '*') {
        // Aceita qualquer caractere
        result += value.charAt(index);
        index++;
      } else {
        // Caracteres fixos da máscara
        result += maskChar;

        // Se o caractere atual do valor corresponder ao caractere fixo da máscara,
        // avançamos o índice no valor também
        if (value.charAt(index) === maskChar) {
          index++;
        }
      }
    }

    return result;
  }
}
