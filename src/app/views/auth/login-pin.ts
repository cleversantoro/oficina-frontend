import { Component } from '@angular/core';
import {appName, credits, currentYear} from '@/app/constants';
import {RouterLink} from '@angular/router';
import {AuthLogo} from '@app/components/auth-logo';
import {NgOtpInputComponent} from 'ng-otp-input';

@Component({
  selector: 'app-login-pin',
  imports: [
    RouterLink,
    AuthLogo,
    NgOtpInputComponent
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
                  <h4 class="fw-bold mt-3">Login with PIN! | HMR+</h4>
                  <p class="text-muted w-lg-75 mx-auto">This screen is locked. Enter your PIN to continue.</p>
                </div>

                <div class="text-center mb-4">
                  <img src="assets/images/users/user-10.jpg" class="rounded-circle img-thumbnail avatar-xxl mb-2"
                       alt="thumbnail">
                  <h5 class="fs-md">Damian D.</h5>
                </div>

                <form>
                  <label class="form-label">Enter your 6-digit code <span class="text-danger">*</span></label>
                  <ng-otp-input
                    [config]="{ length: 6, allowNumbersOnly:true, inputClass:'form-control text-center mb-3',}">
                  </ng-otp-input>

                  <div class="d-grid">
                    <button type="submit" class="btn btn-primary fw-semibold py-2">Confirm</button>
                  </div>
                </form>

                <p class="text-muted text-center mt-4 mb-0">
                  Not you? Return to <a routerLink="/auth/sign-in"
                                        class="text-decoration-underline link-offset-3 fw-semibold">Sign in</a>
                </p>
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
export class LoginPin {

  protected readonly currentYear = currentYear;
  protected readonly credits = credits;
  protected readonly appName = appName;
}
