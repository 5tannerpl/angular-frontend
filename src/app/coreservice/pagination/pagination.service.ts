import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { UrlDiscoverer, UrlLink } from '../http/url';
import { Pagination, PaginationOptions } from './pagination';

@Injectable()
export class PaginationService {
  constructor(
    private _urlDiscoverer: UrlDiscoverer,
    private _httpService: HttpService
  ) {}

  /**
   * refresh the current page
   * @param page
   * @param options
   */
  currPage<T>(
    page: Pagination<T>,
    constructor?: new (res: T) => T,
    options?: PaginationOptions
  ): Observable<Pagination<T>> {
    const link = this._urlDiscoverer.findLink(page, 'self');

    if (options) {
      if (options.params) {
        this.updateParams(link, options.params);
      }
    }

    return this.map(
      this._httpService.get<Pagination<T>>(link.href, options),
      constructor
    );
  }

  /**
   * go to the next page
   * @param page
   * @param options
   */
  nextPage<T>(
    page: Pagination<T>,
    constructor?: new (res: T) => T,
    options?: PaginationOptions
  ): Observable<Pagination<T>> {
    const url = this._urlDiscoverer.findLink(page, 'next').href;
    return this.map(
      this._httpService.get<Pagination<T>>(url, options),
      constructor
    );
  }

  /**
   * go to the prev page
   * @param page
   * @param options
   */
  prevPage<T>(
    page: Pagination<T>,
    constructor?: new (res: T) => T,
    options?: PaginationOptions
  ): Observable<Pagination<T>> {
    const url = this._urlDiscoverer.findLink(page, 'prev').href;
    return this.map(
      this._httpService.get<Pagination<T>>(url, options),
      constructor
    );
  }

  private map<T>(
    observable: Observable<Pagination<T>>,
    constructor?: new (res: T) => T
  ): Observable<Pagination<T>> {
    if (constructor) {
      return observable.pipe(
        map(res => {
          res.data = res.data.map(json => new constructor(json));
          return res;
        })
      );
    }

    return observable;
  }

  private updateParams(link: UrlLink, params: { [param: string]: string }) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const regex = new RegExp(`${key}\=([\\w\\d\.]+)`);
        if (regex.test(link.href)) {
          link.href = link.href.replace(regex, `${key}=${params[key]}`);
          delete params[key];
        }
      }
    }
  }
}
