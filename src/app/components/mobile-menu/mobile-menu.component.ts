// src/app/components/mobile-menu/mobile-menu.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model'; 
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LogoEmpresaComponent } from '../logo-empresa/logo-empresa.component';

@Component({
  selector: 'app-mobile-menu',
  imports: [CommonModule, RouterLink, LogoEmpresaComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @Input() isOpen = false;
  @Input() menuItems: MenuItem[] = [];
  @Input() onClose: () => void = () => {};
  
  openSubmenus: Record<string, boolean> = {};
  
  ngOnInit(): void {
    // Inicializa o estado dos submenus
    this.menuItems.forEach(item => {
      if (item.hasSubmenu) {
        this.openSubmenus[item.name] = false;
      }
    });
  }
  
  toggleSubmenu(menuName: string): void {
    this.openSubmenus[menuName] = !this.openSubmenus[menuName];
  }
  
  isSubmenuOpen(menuName: string): boolean {
    return this.openSubmenus[menuName] || false;
  }
}