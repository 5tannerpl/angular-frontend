import { HttpParams, HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '@app/coreservice/http/url';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { OauthToken } from './token';
export class CustomURLEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
      return encodeURIComponent(key); 
  }
  encodeValue(key: string): string { 
      return encodeURIComponent(key); 
  }
  decodeKey(key: string): string { 
      return decodeURIComponent(key); 
   }
  decodeValue(key: string) {
      return decodeURIComponent(key); 
   }
}

@Injectable()
export class TokenService {
  private readonly _key = 'o';
  private readonly _url = new Url('token');

  constructor(private _httpService: HttpService) {}

  get token(): OauthToken {
    return JSON.parse(localStorage.getItem(this._key));
  }

  set token(val: OauthToken) {
    localStorage.setItem(this._key, JSON.stringify(val));
  }

  get authorizationHeader(): string {
    const token = this.token;
    return token ? `${token.token_type} ${token.access_token}` : '';
  }

  public getToken(username: string, password: string): Observable<any> {
    let params = new HttpParams({encoder: new CustomURLEncoder() });
    params = params.append('grant_type', "password");
    params = params.append('username', username);
    params = params.append('password', password);
    return this._httpService.post(this._url.toString(), params).pipe(
      tap((token: OauthToken) => {
        this.token = token;
      }),
    );
  }

  public clearToken(): void {
    localStorage.clear();
    this.token=null;
  }

}
