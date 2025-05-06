import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { InputMaskHelper } from './custom-validators'

@Directive({
  selector: '[appInputMask]',
  standalone: true
})
export class InputMaskDirective implements OnInit {
  @Input('appInputMask') mask: string = '';
  private previousValue: string = '';

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private control: NgControl
  ) {}

  ngOnInit(): void {
    // Aplicar máscara ao valor inicial, se houver
    if (this.el.nativeElement.value) {
      this.applyMask();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    this.applyMask();
  }

  @HostListener('blur')
  onBlur(): void {
    this.applyMask();
    
    // Validar o campo apenas quando o usuário sair do campo
    if (this.control.control) {
      this.control.control.markAsTouched();
      this.control.control.updateValueAndValidity();
    }
  }

  private applyMask(): void {
    const input = this.el.nativeElement;
    const rawValue = input.value.replace(/\D/g, '');
    
    // Não aplicar máscara se o valor não mudou
    if (rawValue === this.previousValue) {
      return;
    }
    
    const maskedValue = InputMaskHelper.applyMask(rawValue, this.mask);
    this.previousValue = rawValue;
    
    // Atualizar o valor no DOM e no FormControl
    if (input.value !== maskedValue) {
      input.value = maskedValue;
      
      // Atualizar o FormControl sem disparar eventos para evitar ciclos
      if (this.control.control) {
        this.control.control.setValue(maskedValue, { emitEvent: false });
      }
    }
  }
}