import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, Url } from '../http';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});

@Injectable({
  providedIn: 'root'
})
export class CurrentImminentQuoteService {
  private readonly _url = new Url('api/AmActivity/CurrentImminentQuote/:resource');

  constructor(
    private _httpService: HttpService,
  ) { }

  getAreaList(): Observable<any> {
    //const url = this._url.toString({ resource: 'areaList' });
    return this._httpService.get<any>('api/common/areaList');
  }

  getQuoteChecklist(area: string): Observable<any> {
    const url = this._url.toString({ resource: 'getQuoteChecklist' });
    return this._httpService.get<any>(url + '/?area=' + area);
  }

  removeTenderDate(jobNo: string): Observable<any> {
    const url = this._url.toString({ resource: 'removeTenderDate' });
    return this._httpService.get<any>(url + '/?jobNo=' + jobNo);
  }
}
