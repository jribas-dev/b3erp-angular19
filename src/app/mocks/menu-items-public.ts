// src/app/mocks/menu-items-public.ts

import { MenuItem } from '../models/menu-item.model';

export const menuItemsPublic: MenuItem[] = [
  {
    name: 'Acesso ao Sistema',
    hasSubmenu: true,
    subMenuItems: [
      { name: 'Criar nova conta', routePath: '/user-pre' },
      { name: 'Fazer login', routePath: '/auth/login' },
      { name: 'Recuperar senha', routePath: '/auth/reset-password' },
    ],
  },
  {
    name: 'Dúvidas Frequentes',
    routePath: 'https://wiki.b3erp.com.br/',
    hasSubmenu: false,
  },
  {
    name: 'Termos e Acordos',
    hasSubmenu: true,
    subMenuItems: [
      { name: 'Política de Privacidade', routePath: '/option4/suboption1' },
      { name: 'Termos de Uso', routePath: '/option4/suboption2' },
      { name: 'Manutenção e Suporte', routePath: '/option4/suboption3' },
    ],
  },
  {
    name: 'Saiba Mais',
    routePath: 'https://3b3.com.br/',
    hasSubmenu: false,
  },
];
