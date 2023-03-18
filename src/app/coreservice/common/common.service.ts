import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, Url } from '@app/coreservice/http';
import { Observable, Subject  } from 'rxjs';
import { environment } from '@env/environment.prod';

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  });
@Injectable({
    providedIn: 'root'
  })


export class CommonService {
  public OLDOPAUTHCODE:string;
  private readonly _url = new Url('api/common/:resource');
  private readonly _permissionUrl=new Url('api/permission/:resource');
  constructor(
    private _httpService: HttpService,
    private http: HttpClient,
  ) { }

  getPermissionMenum(): Observable<any> {
    const url = this._permissionUrl.toString({ resource: 'getPermissionMenu' });
    return this._httpService.get<any>(url);
  }

  getUserInitial(): Observable<any> {
    const url = this._url.toString({ resource: 'opInitial' });
    return this._httpService.get<any>(url);
  }
  checkCAGroup(): Observable<any> {
    const url = this._url.toString({ resource: 'checkCAGroup' });
    return this._httpService.get<any>(url);
  }
  getUserRoles(): Observable<any> {
    const url = this._url.toString({ resource: 'userRoles' });
    return this._httpService.get<any>(url);
  }

  getAreaList(): Observable<any> {
    const url = this._url.toString({ resource: 'areaList' });
    return this._httpService.get<any>(url);
  }
  getAACodeList(): Observable<any> {
    const url = this._url.toString({ resource: 'aacodeList' });
    return this._httpService.get<any>(url);
  }

  getOpInitialList(): Observable<any> {
    const url = this._url.toString({ resource: 'opInitialList' });
    return this._httpService.get<any>(url);
  }

  getOPManagerInitialList(): Observable<any> {
    const url = this._url.toString({ resource: 'opManagerInitialList' });
    return this._httpService.get<any>(url);
  }
  getJobListViaArea(area: string): Observable<any> {
    const url = this._url.toString({ resource: 'jobListByArea' });
    return this._httpService.get<any>(url+"/"+area);
  }


  jobListViaKeywords(keyword: string): Observable<any> {
    const url = this._url.toString({ resource: 'jobListByKeywords' });
    return this._httpService.get<any>(url+"/"+keyword);
  }
  jobQuadManByJobNo(jobno: string): Observable<any> {
    const url = this._url.toString({ resource: 'jobQuadManByJobNo' });
    return this._httpService.get<any>(url+"/"+jobno);
  }

  requestToken(model: HttpParams): Observable<any> {
    const url = environment.api.authServerUrl+"/connect/token";
    return this._httpService.post<any>(url, model);
  }
  actTypeList(): Observable<any> {
    const url = this._url.toString({ resource: 'apptTypeList' });
    return this._httpService.get<any>(url);
  }
  entTypeList(): Observable<any> {
    const url = this._url.toString({ resource: 'entertainmentList' });
    return this._httpService.get<any>(url);
  }
  confirmNOMSignOffPSDU(model: any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'confirmNOMSignOffPSDU' });
    return this.http.post(url, body,{'headers':headers});
  }
  adoCheckNOMSignOffPSDUList(area:string): Observable<any> {
    const url = this._url.toString({ resource: 'adoCheckNOMSignOffPSDUList' });
    return this._httpService.get<any>(url+"/"+area);
  }
  initialListFromOP(): Observable<any> {
    const url = this._url.toString({ resource: 'initialListFromOP' });
    return this._httpService.get<any>(url);
  }
  setInitial = new Subject<String>();
  setGroupDashboard=new Subject<String>();
}
