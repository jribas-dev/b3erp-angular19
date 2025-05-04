import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-desktop-menu',
  imports: [CommonModule, MenuItemComponent],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.css',
})
export class DesktopMenuComponent {
  @Input() menuItems: MenuItem[] = [];
}
