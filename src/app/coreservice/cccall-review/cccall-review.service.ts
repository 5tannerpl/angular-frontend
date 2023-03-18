import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, Url } from '@app/coreservice/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CCCallReviewService {
  private readonly _url = new Url('api/CcCallReview/Individual/:resource');

  constructor(
    private _httpService: HttpService,
    private http: HttpClient
  ) { }

  ccReviewList(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'ccReviewList' });
    return this.http.post(url, body,{'headers':headers});
  }
  getCurrentRole(): Observable<any> {
    const url = this._url.toString({ resource: 'getCurrentRole' });
    return this._httpService.get<any>(url);
  }
  CCCallReview(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'ccCallReview' });
    return this.http.post(url, body,{'headers':headers});
  }
  ccCallReviewComplete(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'ccCallReviewComplete' });
    return this.http.post(url, body,{'headers':headers});
  }
  signalsList(): Observable<any> {
    const url = this._url.toString({ resource: 'signalsList' });
    return this._httpService.get<any>(url);
  }

  OtherCommentSubmit(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'otherCommentSubmit' });
    return this.http.post(url, body,{'headers':headers});
  }

  otherCommentsReviewList(area: string): Observable<any> {
    const url = this._url.toString({ resource: 'otherCommentsReviewList' });
    return this._httpService.get<any>(url+"/?area="+area);
  }
  
  terminateCCCallReview(callid: string): Observable<any> {
    const url = this._url.toString({ resource: 'terminateCCCallReview' });
    return this._httpService.get<any>(url+"/?callid="+callid);
  }

}
