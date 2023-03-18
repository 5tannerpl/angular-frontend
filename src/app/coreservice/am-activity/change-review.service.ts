import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, Url } from '@app/coreservice/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeReviewService {
  private readonly _url = new Url('api/AmActivity/ChangeReview/:resource');

  constructor(
    private _httpService: HttpService,
  ) { }

  getChangeReviewlist(): Observable<any> {
    const url = this._url.toString({ resource: 'getChangeReviewlist' });
    return this._httpService.get<any>(url );
  }

  getQuestionList(typeGroupId: number): Observable<any> {
    const url = this._url.toString({ resource: 'getQuestionList' });
    return this._httpService.get<any>(url + '/?typeGroupId=' + typeGroupId );
  }

  submitChangeConfirmation(data): Observable<any> {
    const url = this._url.toString({ resource: 'submitChangeConfirmation' });
    return this._httpService.post<any>(url, data);
  }
}
