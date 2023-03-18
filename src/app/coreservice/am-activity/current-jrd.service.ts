import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
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
export class CurrentJrdService {
  private readonly _url = new Url('api/AmActivity/CurrentJrd/:resource');

  constructor(
    private _httpService: HttpService,
    private http: HttpClient
  ) { }

  getCurrentJrdlist(): Observable<any> {
    const url = this._url.toString({ resource: 'getCurrentJrdList' });
    return this._httpService.get<any>(url );
  }

  getMeetingList(jrdProcedureId: number): Observable<any> {
    const url = this._url.toString({ resource: 'getMeetingList' });
    return this._httpService.get<any>(url + '/?jrdProcedureId=' + jrdProcedureId );
  }

  getJobLossImminentList(jrdId: number): Observable<any> {
    const url = this._url.toString({ resource: 'getJobLossImminentList' });
    return this._httpService.get<any>(url + '/?jrdid=' + jrdId );
  }

  updateJRDworkbook(model: any): Observable<any> {
    const formData = new FormData();  
    formData.append('file', model.file, model.file.name); 
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let params = new HttpParams();
    formData.append('Id', model.id);
    formData.append('IDPSDU', model.psduid);
    formData.append('JobNo', model.jobno);
    const url = this._url.toString({ resource: 'updateJRDworkbook' });
    return this.http.post(url, formData,{'headers':headers, params: params});
  }

  initiatedJRDProcess(model: any): Observable<any> {
    const formData = new FormData();  
    formData.append('file', model.file, model.file.name); 
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let params = new HttpParams();
    formData.append('Id', model.id);
    formData.append('IDPSDU', model.psduid);
    formData.append('JobNo', model.jobno);
    const url = this._url.toString({ resource: 'initiatedJRDProcess' });
    return this.http.post(url, formData,{'headers':headers, params: params});
  }

  addJRDMetting(model: any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'addJRDMetting' });
    return this.http.post(url, body,{'headers':headers});
  }
  
  addJobLossImminent(model: any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'addJobLossImminent' });
    return this.http.post(url, body,{'headers':headers});
  }
  
  closeJRDProcess(model: any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(model);
    const url = this._url.toString({ resource: 'closeJRDProcess' });
    return this.http.post(url, body,{'headers':headers});
  }
}
