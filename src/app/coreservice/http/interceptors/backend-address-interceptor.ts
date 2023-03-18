import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpProgressService } from '../progress-bar';

const prefix = `${environment.api.addr}/`;

/**
 * attach backend api url prefix
 */
@Injectable()
export class BackendAddressInterceptor implements HttpInterceptor {
  constructor(private _httpProgress: HttpProgressService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newRequest: HttpRequest<any>;
    let update = {};

    if (req.url.indexOf('oauth/v2/token') >= 0) {
      update = {
        url: `${environment.api.addr}/${req.url}`
      };
    } else if (/^(?!http).+/.test(req.url)) {
      update = {
        url: `${prefix}/${req.url}`
      };
    }

    newRequest = req.clone(update);
    this._httpProgress.start();

    return next
      .handle(newRequest)
      .pipe(finalize(() => this._httpProgress.stop()));
  }
}

export const BackendAddressInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BackendAddressInterceptor,
  multi: true
};
