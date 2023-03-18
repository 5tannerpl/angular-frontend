import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, Url } from '../http';
import { CurrentSingleIssueComment } from '../models/am-activities-classes';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});

@Injectable({
  providedIn: 'root'
})
export class CurrentIssueJobListService {
  private readonly _url = new Url('api/AmActivity/CurrentIssueJobList/:resource');

  constructor(
    private _httpService: HttpService,
  ) { }

  getAreaList(): Observable<any> {
    //const url = this._url.toString({ resource: 'areaList' });
    return this._httpService.get<any>('api/common/areaList');
  }

  getCurrentIssueJobList(area: string): Observable<any> {
    const url = this._url.toString({ resource: 'getCurrentIssueJobList' });
    return this._httpService.get<any>(url + '/?area=' + area);
  }

  updateIssueCommentById(comment: CurrentSingleIssueComment): Observable<any> {
    const url = this._url.toString({ resource: 'updateIssueCommentById' });
    return this._httpService.post<any>(url, comment);
  }

  removeIssueCommentById(comment: CurrentSingleIssueComment): Observable<any> {
    const url = this._url.toString({ resource: 'removeIssueCommentById' });
    return this._httpService.post<any>(url, comment);
  }

  removeAllIssueComments(jobNo: string): Observable<any> {
    const url = this._url.toString({ resource: 'removeAllIssueComments' });
    return this._httpService.get<any>(url + '/?jobNo=' + jobNo);
  }
}
