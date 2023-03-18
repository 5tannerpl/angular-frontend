import {
  HttpClient,
  HttpResponse,
  HttpParams,
  HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination, Resource } from '@app/coreservice';
import { UrlDiscoverer } from '@app/coreservice/http/url/url-dicoverer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService extends HttpClient {
  constructor(private _urlDiscover: UrlDiscoverer, handler: HttpHandler) {
    super(handler);
  }

  getHeaders(url: string, headers: string[]): Observable<string[]> {
    return this.head(url, { observe: 'response' }).pipe(
      map((res: HttpResponse<object>) => {
        const values = [];
        for (const header of headers) {
          values.push(res.headers.get(header));
        }

        return values;
      })
    );
  }

  getSingle<T>(
    url: string,
    constructor?: new (res: T) => T,
    options?: {
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
    }
  ): Observable<T> {
    const observer = this.get<T>(url, options);

    if (constructor) {
      return observer.pipe(map(res => new constructor(res)));
    }

    return observer;
  }

  getSingleByResource<T>(
    resource: Resource,
    linkName: string,
    constructor?: new (res: T) => T,
    options?: {
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
    }
  ): Observable<T> {
    const link = this._urlDiscover.findLink(resource, linkName);
    if (!link) {
      throw new Error(`Invalid ${link} for ${typeof resource}.`);
    }

    return this.getSingle(link.href, constructor, options);
  }

  getCollection<T>(
    url: string,
    constructor?: new (res: T) => T,
    options?: {
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
    }
  ): Observable<T[]> {
    const observer = this.get<T[]>(url, options);

    if (constructor) {
      return observer.pipe(map(res => res.map(json => new constructor(json))));
    }

    return observer;
  }

  getByPage<T>(
    url: string,
    pageNumber: number,
    pageSize: number,
    constructor: new (res: T) => T,
    options: {
      params?: HttpParams;
    } = {}
  ): Observable<Pagination<T>> {
    if (options.params) {
      options.params = options.params.append(
        'pageNumber',
        pageNumber.toString()
      );
      options.params = options.params.append('pageSize', pageSize.toString());
    } else {
      options = {
        params: new HttpParams({
          fromObject: {
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString()
          }
        })
      };
    }

    const observer = this.get<Pagination<T>>(url, options);
    return observer.pipe(
      map(res => {
        return res;
      })
    );
  }

}
