import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, Url } from '@app/coreservice/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })


export class SignatureReviewService {
  private readonly _url = new Url('api/AmActivity/SignatureReview/:resource');

  constructor(
    private _httpService: HttpService,
  ) { }
  
  getJobSingatureReviewList(model: HttpParams): Observable<any> {
    const url = this._url.toString({ resource: 'signatureList' });
    return this._httpService.get<any>(url,{params: model});
  }

}
