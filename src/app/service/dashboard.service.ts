import { Injectable } from '@angular/core';
import { HttpService, Url } from '../service/http';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {environment} from "src/environments/environment";
import { visitList } from '../models/dashboard.model';

@Injectable()
export class DashboardService {  
  
  //private readonly _url = 'users/1';

  constructor(
    private _httpClinent:HttpClient
  ) { }

  /* public getUsers():Observable<any>{
    const url = this._url.toString();
    return this._httpClinent.get<any>(`${environment.apiUrl}/${this._url}`);
  } */
  getVisitList():Observable<visitList[]>{
    return of()
  }
}
