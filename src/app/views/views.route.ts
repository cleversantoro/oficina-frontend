import { Routes } from '@angular/router'
import { Dashboard } from './dashboard/dashboard'
import { Agenda } from './agenda/agenda'
//import {Analytics} from '@/app/views/analytics/analytics';
//import {Widgets} from '@/app/views/widgets/widgets';

export const VIEWS_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    data: { title: 'Dashboard' },
  },
  {
    path: 'agenda',
    component: Agenda,
    data: { title: 'Agenda' },
  },
  // {
  //   path: 'analytics',
  //   component: Analytics,
  //   data: {title: 'Analytics'},
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./apps/apps.route').then((mod) => mod.APPS_ROUTES)
  // },
  {
    path: '',
    loadChildren: () => import('./cadastro/cadastro.route').then((mod) => mod.CADASTRO_ROUTES)
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./other-apps/other-apps.route').then((mod) => mod.OTHER_APPS_ROUTES)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/pages.route').then((mod) => mod.PAGES_ROUTES)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./miscellaneous/miscellaneous.route').then((mod) => mod.MISCELLANEOUS_ROUTES)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./layouts/layout.routes').then((mod) => mod.LAYOUT_ROUTES)
  // },
  // {
  //   path: 'widgets',
  //   component: Widgets,
  //   data: {title: 'Widgets'},
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./forms/forms.route').then((mod) => mod.FORMS_ROUTES)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./tables/tables.route').then((mod) => mod.TABLES_ROUTES)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./maps/maps.route').then((mod) => mod.MAPS_ROUTES)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./icons/icons.route').then((mod) => mod.ICONS_ROUTES)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./charts/charts.routes').then((mod) => mod.CHARTS_ROUTES)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./ui/ui.route').then((mod) => mod.UI_ROUTES)
  // },

]
