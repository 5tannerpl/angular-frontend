import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, Url } from '../http';
import { GroupContact } from '../models/emcs-classes';

@Injectable({
  providedIn: 'root'
})
export class PermanentNoInCccallListService {

  private readonly _url = new Url('api/CeoActivity/PermanentNoInCccallList/:resource');

  constructor(
    private _httpService: HttpService,
  ) { }
  
  getPermanentNoInCccallList(): Observable<any> {
    const url = this._url.toString({ resource: 'getPermanentNoInCccallList' });
    return this._httpService.get<any>(url);
  }

  
  getAllPermanentsList(): Observable<any> {
    const url = this._url.toString({ resource: 'getAllPermanentsList' });
    return this._httpService.get<any>(url);
  }
  upsertPermanentNoCcCall(item: any): Observable<any> {
    const url = this._url.toString({ resource: 'upsertPermanentNoCcCall' });
    return this._httpService.post<any>(url, item);
  }
  
  removePermanentNoCcCall(item: GroupContact): Observable<any> {
    const url = this._url.toString({ resource: 'removePermanentNoCcCall' });
    return this._httpService.post<any>(url, item);
  }
}
