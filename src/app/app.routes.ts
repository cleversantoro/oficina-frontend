import { Routes } from '@angular/router'
import { VerticalLayout } from '@layouts/vertical-layout/vertical-layout'
//import { Landing } from '@/app/views/landing/landing';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: VerticalLayout,
    loadChildren: () =>
      import('./views/views.route').then((mod) => mod.VIEWS_ROUTES),
  },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./views/other-pages/other-pages.route').then((mod) => mod.OTHER_PAGES_ROUTES),
  // },
  {
    path: '',
    loadChildren: () =>
      import('./views/auth/auth.route').then((mod) => mod.Auth_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./views/error/error.route').then((mod) => mod.ERROR_PAGES_ROUTES),
  },
  // {
  //   path: 'landing',
  //   component: Landing,
  //   data: { title: 'One page Landing' }
  // },

]
