import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, Url } from '../http';

@Injectable({
  providedIn: 'root'
})
export class NewContactConfirmationService {
  private readonly _url = new Url('api/AmActivity/NewContactConfirmation/:resource');

  constructor(
    private _httpService: HttpService,
  ) { }

  getChangeContactConfirmationlist(): Observable<any> {
    const url = this._url.toString({ resource: 'getChangeContactConfirmationlist' });
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
