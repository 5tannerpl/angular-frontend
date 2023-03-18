import { HttpHeaders, HttpClient } from '@angular/common/http';
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
export class MainContactReviewService {
  private readonly _url = new Url('api/AmActivity/MainContactReview/:resource');

  constructor(
    private _httpService: HttpService,
    private http: HttpClient
  ) {

  }

  getMainContactReviewList(area: string): Observable<any> {
    const url = this._url.toString({ resource: 'getMainContactReviewList' });
    return this._httpService.get<any>(url + '/?area=' + area);
  }
  updateMainContactConfirmedDate(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'updateMainContactConfirmedDate' });
    return this.http.post(url, body,{'headers':headers});
  }
  contactInfoAddToCheckList(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'contactInfoAddToCheckList' });
    return this.http.post(url, body,{'headers':headers});
  }
}
