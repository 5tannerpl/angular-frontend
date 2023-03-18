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
export class MainDoNotTakeCcCallService {
  private readonly _url = new Url('api/AmActivity/MainDoNotTakeCcCall/:resource');

  constructor(
    private _httpService: HttpService,
  ) {

  }

  getAreaList(): Observable<any> {
    //const url = this._url.toString({ resource: 'areaList' });
    return this._httpService.get<any>('api/common/areaList');
  }

  getMainContactReviewList(area: string): Observable<any> {
    const url = this._url.toString({ resource: 'getMainContactReviewList' });
    return this._httpService.get<any>(url + '/?area=' + area);
  }

  getReviewList(): Observable<any> {
    const url = this._url.toString({ resource: 'getReviewList' });
    return this._httpService.get<any>(url);
  }

  updatePRCall(prKey: string, reviewId: string): Observable<any> {
    const url = this._url.toString({ resource: 'updatePRCall' });
    return this._httpService.get<any>(url + '/?prKey=' + prKey + '&reviewId=' + reviewId);
  }
}
