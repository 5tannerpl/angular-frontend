import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpStatusCode } from '../http-status-code';
import { TokenService } from '../../auth';

@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {
  constructor(private _injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenService = this._injector.get(TokenService);
    const router = this._injector.get(Router);

    if (req.url.indexOf('oauth/v2/token') >= 0) {
      return next.handle(req);
    }

    const authreq = req.clone({
      headers: req.headers.set(
        'Authorization',
        tokenService.authorizationHeader
      )
    });
    return next.handle(authreq).pipe(
      tap(
        event => {},
        (error: HttpErrorResponse) => {
          if (
            error instanceof HttpErrorResponse &&
            error.status === HttpStatusCode.Unauthorized
          ) {
            // to do reopen
           // router.navigate(['login']);
          }
        }
      )
    );
  }
}

export const authorizationHeaderInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthorizationHeaderInterceptor,
  multi: true
};
