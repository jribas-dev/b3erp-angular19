import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { MenuItem } from '../../../models/menu-item.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent {
  @Input() item!: MenuItem;
  @ViewChild('menuItemRef') menuItemRef!: ElementRef;

  isSubmenuOpen = false;

  toggleSubmenu(): void {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  closeSubmenu(): void {
    this.isSubmenuOpen = false;
  }

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (
      this.isSubmenuOpen &&
      this.menuItemRef &&
      !this.menuItemRef.nativeElement.contains(event.target)
    ) {
      this.closeSubmenu();
    }
  }
}
