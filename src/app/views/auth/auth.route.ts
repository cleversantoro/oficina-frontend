import {Routes} from '@angular/router'
import {SignIn} from '@/app/views/auth/sign-in'
import {SignUp} from '@/app/views/auth/sign-up'
import {ResetPassword} from '@/app/views/auth/reset-password'
import {NewPassword} from '@/app/views/auth/new-password'
import {TwoFactor} from '@/app/views/auth/two-factor'
import {LockScreen} from '@/app/views/auth/lock-screen'
import {SuccessMail} from '@/app/views/auth/success-mail';
import {LoginPin} from '@/app/views/auth/login-pin';
import {DeleteAccount} from '@/app/views/auth/delete-account';

export const Auth_ROUTES: Routes = [
  {
    path: 'auth/sign-in',
    component: SignIn,
    data: {title: 'Sign In'},
  },
  {
    path: 'auth/sign-up',
    component: SignUp,
    data: {title: 'Sign Up'},
  },
  {
    path: 'auth/reset-password',
    component: ResetPassword,
    data: {title: 'Reset Password'},
  },
  {
    path: 'auth/new-password',
    component: NewPassword,
    data: {title: 'New Password'},
  },
  {
    path: 'auth/two-factor',
    component: TwoFactor,
    data: {title: 'Two Factor'},
  },
  {
    path: 'auth/lock-screen',
    component: LockScreen,
    data: {title: 'Lock Screen'},
  },
  {
    path: 'auth/success-mail',
    component: SuccessMail,
    data: {title: 'Success Mail'},
  },
  {
    path: 'auth/login-pin',
    component: LoginPin,
    data: {title: 'Login Pin'},
  },
  {
    path: 'auth/delete-account',
    component: DeleteAccount,
    data: {title: 'Delete Account'},
  },
]
