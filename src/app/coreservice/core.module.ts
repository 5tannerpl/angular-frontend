import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthenticationService, TokenService } from './auth';
import { PaginationService } from './pagination';
import {
  authorizationHeaderInterceptorProvider,
  GlobalErrorHandler,
  HttpErrorHandler,
  HttpProgressModule,
  HttpService,
  BackendAddressInterceptorProvider,
  UrlDiscoverer
} from './http';
import { DashboardService } from './dashboard/dashboard.service';

@NgModule({
  imports: [HttpProgressModule],
  exports: [HttpProgressModule],
  providers: [
    authorizationHeaderInterceptorProvider,
    BackendAddressInterceptorProvider,
    AuthenticationService,
    HttpErrorHandler,
    HttpService,
    PaginationService,
    TokenService,
    UrlDiscoverer,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    DashboardService,
  ]
})
export class CoreServiceModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreServiceModule
  ) {
    if (parentModule) {
      throw new Error(
        'Core module should only be imported in the root module!'
      );
    }
  }
}
