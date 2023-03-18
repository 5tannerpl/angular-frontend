import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService, Url } from '@app/coreservice/http';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class PermissionService {
  private readonly _url = new Url('api/permission/:resource');
  private emitUpdateConatct = new Subject<any>();
  private emitChangeSource = new Subject<any>();

  constructor(
    private _httpService: HttpService,
  ) { }

  getPermissionMenum(): Observable<any> {
    const url = this._url.toString({ resource: 'getPermissionMenu' });
    return this._httpService.get<any>(url);
  }
}
