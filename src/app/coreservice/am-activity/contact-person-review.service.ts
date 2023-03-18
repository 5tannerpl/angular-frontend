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
export class ContactPersonReviewService {
  private readonly _url = new Url('api/AmActivity/ContactChecklist/:resource');

  constructor(
    private _httpService: HttpService,
    private http: HttpClient
  ) {

  }

  ContactPersonReviewList(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'contactPersonReviewList' });
    return this.http.post(url, body,{'headers':headers});
  }

  ContactInfoAddToCheckList(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'contactInfoAddToCheckList' });
    return this.http.post(url, body,{'headers':headers});
  }
}
