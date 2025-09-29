import { Component } from '@angular/core';
import {AuthLogo} from '@app/components/auth-logo';
import {appName, credits, currentYear} from '@/app/constants';

@Component({
  selector: 'app-error-401',
  imports: [
    AuthLogo
  ],
  template: `
    <div class="auth-box d-flex align-items-center">
      <div class="container-xxl">
        <div class="row align-items-center justify-content-center">
          <div class="col-xxl-4 col-md-6 col-sm-8">
            <div class="card ">
              <div class="card-body">

                <div class="auth-brand text-center mb-3">
                  <app-auth-logo/>
                </div>

                <div class="p-2 text-center">
                  <div class="shadow-dance-text">401</div>

                  <h3 class="fw-bold text-uppercase">Unauthorized Access</h3>
                  <p class="text-muted"> You don't have permission to view this page.</p>

                  <a routerLink="/" class="btn btn-primary mt-3 rounded-pill">Back to
                    Safety</a>
                </div>

              </div>
            </div>
            <p class="text-center text-muted mt-5 mb-0">
              © 2015 -
              {{ currentYear }} {{ appName }} — by
              <span class="fw-bold">{{ credits.name }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class Error401 {

  protected readonly currentYear = currentYear;
  protected readonly credits = credits;
  protected readonly appName = appName;
}
