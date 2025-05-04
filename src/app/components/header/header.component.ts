import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { DesktopMenuComponent } from '../desktop-menu/desktop-menu.component';
import { LogoEmpresaComponent } from '../logo-empresa/logo-empresa.component';
import { menuItemsPublic } from '../../mocks/menu-items-public';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MobileMenuComponent,
    DesktopMenuComponent,
    LogoEmpresaComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[] = [];
  isMobileMenuOpen = false;

  ngOnInit(): void {
    this.menuItems = menuItemsPublic;
  }

  openMobileMenu(): void {
    this.isMobileMenuOpen = true;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
