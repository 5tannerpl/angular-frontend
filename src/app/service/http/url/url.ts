import { Observable } from "rxjs";

export class Url {
    private readonly _urlParamsRegex = /(\/\:\w+)/gi;

    constructor(private readonly _path: string) {}

    toString(params?: { [key: string]: string | number }): string {
        let urlString = this._path;
    
        for (const key in params) {
          if (params.hasOwnProperty(key) === false) {
            continue;
          }
    
          const regex = new RegExp(`\:${key}`, 'i');
          const paramValue = params[key];
          const value =
            typeof paramValue === 'number' ? paramValue.toString() : paramValue;
          urlString = urlString.replace(regex, value);
        }
    
        /**
         * collapse all unused params
         */
        return urlString.replace(this._urlParamsRegex, '');
      }
};
export declare class HttpHeaders {};
export declare class HttpParams {};
export declare class HttpRequest<T>{};
export declare enum HttpEventType {
    Sent = 0,
};
export declare interface HttpSentEvent {
    type: HttpEventType.Sent;
}
export declare type HttpEvent<T> = HttpSentEvent;
export declare abstract class HttpHandler {
    abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}
export declare class HttpClient {
    private handler;
    constructor(handler: HttpHandler);
    get<T>(url: string, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T>;}
export class HttpService extends HttpClient{}

    
      
   