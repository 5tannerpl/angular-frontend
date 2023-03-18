import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, Url } from '@app/coreservice/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});

@Injectable({
  providedIn: 'root'
})

export class OpportunityChecklistService {
  private readonly _url = new Url('api/AmActivity/OpportunityChecklist/:resource');

  constructor(
    private _httpService: HttpService,
  ) {

  }

  getOpportunityChecklistExcel(area: string): Observable<any> {
    const url = this._url.toString({ resource: 'getOpportunityChecklistExcel' });
    return this._httpService.get<Blob>(url + '/?area=' + area, {
      responseType: 'blob' as 'json' });
  }

  getOpportunityChecklist(area: string): Observable<any> {
    const url = this._url.toString({ resource: 'getOpportunityChecklist' });
    return this._httpService.get<any>(url + '/?area=' + area);
  }

  getAreaList(): Observable<any> {
    //const url = this._url.toString({ resource: 'areaList' });
    return this._httpService.get<any>('api/common/areaList');
  }

  confirmOpportunityLeadtoWork(jobId: number[], isLedtoWork: number): Observable<any> {
    const url = this._url.toString({ resource: 'confirmOpportunityLeadtoWork' });
    return this._httpService.post<any>(url + '/?isLedtoWork=' + isLedtoWork, jobId);
  }
}
