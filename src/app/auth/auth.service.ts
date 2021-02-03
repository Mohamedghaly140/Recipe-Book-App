import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAuthApiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errResponse) => {
          let errorMrssage = 'An unknown error occurred';

          if (!errResponse.error || !errResponse.error.error) {
            return throwError(errorMrssage);
          }

          switch (errResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMrssage =
                'The email address is already in use by another account.';
              break;
            case 'OPERATION_NOT_ALLOWED':
              errorMrssage = 'Password sign-in is disabled for this project.';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMrssage =
                'We have blocked all requests from this device due to unusual activity. Try again later.';
              break;
            default:
              errorMrssage = 'Someting went wrong. Try again later.';
              break;
          }

          return throwError(errorMrssage);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAuthApiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errResponse) => {
          let errorMrssage = 'An unknown error occurred';

          if (!errResponse.error || !errResponse.error.error) {
            return throwError(errorMrssage);
          }

          switch (errResponse.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMrssage =
                'There is no user record corresponding to this identifier. The user may have been deleted.';
              break;
            case 'INVALID_PASSWORD':
              errorMrssage =
                'The password is invalid or the user does not have a password.';
              break;
            case 'USER_DISABLED':
              errorMrssage =
                ' The user account has been disabled by an administrator.';
              break;
            default:
              errorMrssage = 'Someting went wrong. Try again later.';
              break;
          }

          return throwError(errorMrssage);
        })
      );
  }
}
