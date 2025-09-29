import { Component } from '@angular/core';
import {appName, credits, currentYear} from '@/app/constants';
import {AuthLogo} from '@app/components/auth-logo';

@Component({
  selector: 'app-error-403',
  imports: [
    AuthLogo
  ],
  template: `
    <div class="auth-box overflow-hidden align-items-center d-flex">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xxl-4 col-md-6 col-sm-8">
            <div class="card">
              <div class="card-body">
                <div class="auth-brand text-center mb-3">
                  <app-auth-logo/>
                </div>

                <div class="p-2 text-center">
                  <div class="shadow-dance-text">403</div>
                  <h3 class="fw-bold text-uppercase">Forbidden</h3>
                  <p class="text-muted">You don't have permission to access this resource.</p>

                  <button class="btn btn-primary mt-3 rounded-pill">Go Home</button>

                </div>
              </div>
            </div>

            <p class="text-center text-muted mt-5 mb-0">
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
export class Error403 {

  protected readonly currentYear = currentYear;
  protected readonly credits = credits;
  protected readonly appName = appName;
}
