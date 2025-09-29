import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-auth-logo',
  imports: [
    RouterLink
  ],
  template: `
    <a routerLink="/" class="logo-dark">
      <img src="assets/images/logo-black.png" alt="dark logo" height="32">
    </a>
    <a routerLink="/" class="logo-light">
      <img src="assets/images/logo.png" alt="logo" height="32">
    </a>
  `,
  styles: ``
})
export class AuthLogo {

}
