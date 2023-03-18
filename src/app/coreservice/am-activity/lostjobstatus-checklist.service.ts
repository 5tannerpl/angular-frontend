import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, Url } from '@app/coreservice/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })


export class LostJobStatusCheckListService {
  private readonly _url = new Url('api/AmActivity/JobStatusChecklist/:resource');

  constructor(
    private _httpService: HttpService,
    private http: HttpClient
  ) { }
  
  getLostJobListViaArea(area: string,sort:string,sortType:string): Observable<any> {
    const url = this._url.toString({ resource: 'lostJobList' });
    return this._httpService.get<any>(url+"/?area="+area+"&sort="+sort+"&sortType="+sortType);
  }

  getAppointSchedListViaArea(area: string,sort:string,sortType:string): Observable<any> {
    const url = this._url.toString({ resource: 'appointSchedListViaArea' });
    return this._httpService.get<any>(url+"/?area="+area+"&sort="+sort+"&sortType="+sortType);
  }

  cancelAppointSchedListViaId(id:number): Observable<any> {
    const url = this._url.toString({ resource: 'cancelAppointSchedListViaId' });
    return this._httpService.get<any>(url+"/?id="+id);
  }

  getJRDCheckListViaArea(area:string): Observable<any> {
    const url = this._url.toString({ resource: 'jrdCheckList' });
    return this._httpService.get<any>(url+"/?area="+area);
  }
  getCMJRDCheckListViaArea(area:string): Observable<any> {
    const url = this._url.toString({ resource: 'cmjrdCheckList' });
    return this._httpService.get<any>(url+"/?area="+area);
  }
  getPRCheckListViaArea(area:string): Observable<any> {
    const url = this._url.toString({ resource: 'prCheckList' });
    return this._httpService.get<any>(url+"/?area="+area);
  }

  getADOJRDCheckAnswer(): Observable<any> {
    const url = this._url.toString({ resource: 'getADOJRDCheckAnswer' });
    return this._httpService.get<any>(url);
  }
  getCMJRDCheckAnswer(): Observable<any> {
    const url = this._url.toString({ resource: 'getCMJRDCheckAnswer' });
    return this._httpService.get<any>(url);
  }
  groupQuestionList(): Observable<any> {
    const url = this._url.toString({ resource: 'groupQuestionList' });
    return this._httpService.get<any>(url);
  }

  jobStatusList(): Observable<any> {
    const url = this._url.toString({ resource: 'jobStatusList' });
    return this._httpService.get<any>(url);
  }

  prRecordsViaJob(jobNo:string): Observable<any> {
    const url = this._url.toString({ resource: 'prListViaJob' });
    return this._httpService.get<any>(url+"/?jobNo="+jobNo);
  }

  updateLostJobStatus(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'updateLostJobStatus' });
    return this.http.post(url, body,{'headers':headers});
  }
  
  adoConfirmAMJRDProcess(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'adoConfirmAMJRDProcess' });
    return this.http.post(url, body,{'headers':headers});
  }
  cmConfirmAMJRDProcess(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'cmConfirmAMJRDProcess' });
    return this.http.post(url, body,{'headers':headers});
  }
  adoConfirmPRProcess(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'adoConfirmPRProcess' });
    return this.http.post(url, body,{'headers':headers});
  }

  newAppointmentSchedule(model:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'newAppointmentSchedule' });
    return this.http.post(url, body,{'headers':headers});
  }

}
