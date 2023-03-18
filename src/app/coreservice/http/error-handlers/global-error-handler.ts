import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorHandler } from './http-error-handler';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    private _httpErrorHandler: HttpErrorHandler;

    constructor(private _injector: Injector) {
        super();

        setTimeout(() => {
            this._httpErrorHandler = this._injector.get(HttpErrorHandler);
        });
    }

    handleError(error) {
        const isHttpError = error instanceof HttpErrorResponse;

        if (isHttpError) {
            this._httpErrorHandler.handleError(error as HttpErrorResponse);
        } else {
            super.handleError(error);
        }
    }
}
