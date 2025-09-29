import {Routes} from '@angular/router';
import {Error400} from '@/app/views/error/error-400';
import {Error401} from '@/app/views/error/error-401';
import {Error403} from '@/app/views/error/error-403';
import {Error404} from '@/app/views/error/error-404';
import {Error408} from '@/app/views/error/error-408';
import {Error500} from '@/app/views/error/error-500';


export const ERROR_PAGES_ROUTES: Routes = [
  {
    path: 'error/400',
    component: Error400,
    data: {title: "Error 401"},
  },
  {
    path: 'error/401',
    component: Error401,
    data: {title: "Error 401"},
  },
  {
    path: 'error/403',
    component: Error403,
    data: {title: "Error 403"}
  },
  {
    path: 'error/404',
    component: Error404,
    data: {title: "Error 404"}
  },
  {
    path: 'error/408',
    component: Error408,
    data: {title: "Error 408"}
  },
  {
    path: 'error/500',
    component: Error500,
    data: {title: "Error 500"}
  },
];
