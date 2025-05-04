import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo-empresa',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './logo-empresa.component.html',
  styleUrl: './logo-empresa.component.css'
})
export class LogoEmpresaComponent {
  @Input() dark = false;
  
  get logoSrc(): string {
    const logoClass = this.dark ? '-dark' : '-light';
    return `images/logoB3Erp${logoClass}.png`;
  }
}
