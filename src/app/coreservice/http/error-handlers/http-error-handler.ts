import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpStatusCode } from '../http-status-code';

@Injectable()
export class HttpErrorHandler {
  constructor() {}

  handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case HttpStatusCode.BadRequest:
        this.handleBadRequest(error);
        break;
      case HttpStatusCode.Unauthorized:
        this.handleUnauthorized(error);
        break;
      case HttpStatusCode.Forbidden:
        this.handleForbidden(error);
        break;
      case HttpStatusCode.NotFound:
        this.handleNotFound(error);
        break;
      case HttpStatusCode.InternalServerError:
        this.handleInternalServerError(error);
    }
  }

  private handleBadRequest(errorResponse: HttpErrorResponse) {
  }

  private handleUnauthorized(errorResponse: HttpErrorResponse) {}

  private handleForbidden(errorResponse: HttpErrorResponse) {}

  private handleNotFound(errorResponse: HttpErrorResponse) {}

  private handleInternalServerError(errorResponse: HttpErrorResponse) {}
}
