import { Component } from '@angular/core';
import {appName, credits, currentYear} from '@/app/constants';
import {RouterLink} from '@angular/router';
import {AuthLogo} from '@app/components/auth-logo';

@Component({
  selector: 'app-success-mail',
  imports: [
    RouterLink,
    AuthLogo
  ],
  template: `
    <div class="color-line"></div>
    <a routerLink="/" class="btn d-none d-lg-block btn-dark position-absolute z-1 m-3">Back to Dashboard</a>
    <div class="auth-box overflow-hidden align-items-center d-flex">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xxl-4 col-md-6 col-sm-8">
            <div class="card">
              <div class="card-body">
                <div class="auth-brand text-center mb-4">
                  <app-auth-logo/>
                  <p class="mt-3 text-muted w-lg-75 mx-auto">Awesome! You’ve read the important message like a pro.</p>
                </div>

                <form>
                  <div class="mb-4">
                    <div class="avatar-xxl mx-auto mt-2">
                      <div class="avatar-title bg-light-subtle border border-light border-dashed rounded-circle">
                        <img src="assets/images/checkmark.png" alt="dark logo" height="64">
                      </div>
                    </div>
                  </div>

                  <h4 class="fw-bold text-center mb-4">Well Done! Email verified Successfully</h4>

                  <div class="d-grid">
                    <button type="submit" class="btn btn-primary fw-semibold py-2">Bake to Dashboard</button>
                  </div>
                </form>
              </div>
            </div>

            <p class="text-center text-muted mt-4 mb-0">
              © 2015 - {{
                currentYear
              }} {{ appName }} — by <span class="fw-semibold">{{ credits.name }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class SuccessMail {

  protected readonly currentYear = currentYear;
  protected readonly credits = credits;
  protected readonly appName = appName;
}
