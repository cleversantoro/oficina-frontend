import { Component } from '@angular/core'
import {appName, credits, currentYear} from '@/app/constants'
import { RouterLink } from '@angular/router'
import { PasswordStrengthBar } from '@app/components/password-strength-bar'
import { FormsModule } from '@angular/forms'
import {AuthLogo} from '@app/components/auth-logo';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, FormsModule, PasswordStrengthBar, AuthLogo],
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
                  <app-auth-logo />
                  <h4 class="fw-bold mt-3">Register to HMR+</h4>
                  <p class="text-muted w-lg-75 mx-auto">
                    Let’s get you started. Create your account by entering your
                    details below.
                  </p>
                </div>

                <form>
                  <div class="mb-3">
                    <label for="userName" class="form-label"
                      >Name <span class="text-danger">*</span></label
                    >
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        id="userName"
                        placeholder="Damian D."
                        required
                      />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="userEmail" class="form-label"
                      >Email address <span class="text-danger">*</span></label
                    >
                    <div class="input-group">
                      <input
                        type="email"
                        class="form-control"
                        id="userEmail"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div class="mb-3" data-password="bar">
                    <label for="userPassword" class="form-label"
                      >Password <span class="text-danger">*</span></label
                    >
                    <div class="input-group">
                      <input
                        type="password"
                        name="password"
                        class="form-control"
                        id="userPassword"
                        placeholder="••••••••"
                        required
                        [(ngModel)]="password"
                      />
                    </div>
                    <app-password-strength-bar [password]="password" />
                  </div>

                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        class="form-check-input form-check-input-light fs-14 mt-0"
                        type="checkbox"
                        id="termAndPolicy"
                      />
                      <label class="form-check-label" for="termAndPolicy"
                        >Agree the Terms & Policy</label
                      >
                    </div>
                  </div>

                  <div class="d-grid">
                    <button
                      type="submit"
                      class="btn btn-primary fw-semibold py-2"
                    >
                      Create Account
                    </button>
                  </div>
                </form>

                <p class="text-muted text-center mt-4 mb-0">
                  Already have an account?
                  <a
                    routerLink="/auth/sign-in"
                    class="text-decoration-underline link-offset-3 fw-semibold"
                    >Login</a
                  >
                </p>
              </div>
            </div>
            <p class="text-center text-muted mt-4 mb-0">
              © 2015 - {{ currentYear }} {{ appName }} — by
              <span class="fw-semibold">{{ credits.name }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class SignUp {
  password: string = ''

  protected readonly currentYear = currentYear
  protected readonly credits = credits
  protected readonly appName = appName;
}
