export interface SubMenuItem {
  name: string;
  routePath: string;
}

export interface MenuItem {
  name: string;
  routePath?: string;
  hasSubmenu: boolean;
  subMenuItems?: SubMenuItem[];
}

