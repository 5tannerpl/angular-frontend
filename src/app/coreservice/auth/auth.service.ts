import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { User } from './user';
import { environment } from '@env/environment.prod';

/**
 * handles oauth flow
 */
@Injectable()
export class AuthenticationService {
  private _claims = {
    username: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
    roles: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
  };

  constructor(private _tokenService: TokenService) {}

  public login(username: string, password: string): Observable<any> {
    return this._tokenService.getToken(username, password);
  }

  public logout(): void {
    if(environment.api.authserver){
      var queryParams = { id_token_hint: localStorage.id_token, post_logout_redirect_uri: environment.api.authredirect };
      var baseUrl = environment.api.authServerUrl+'/connect/endsession?' + this.buildQueryString(queryParams);
      this._tokenService.clearToken();
      localStorage.clear();
      window.location.href = baseUrl;

    }else{
      this._tokenService.clearToken();
      localStorage.clear();
      window.location.href = environment.api.authredirect;
    }
  }

  public get user(): User {
    const token: any = this._tokenService.token;
    if(token==null && environment.api.authserver){
      this._tokenService.clearToken();
      this.authorizationCodeFlow();
    }else if(token==null){
      console.log(localStorage);
      window.location.href = environment.api.authredirect;
      return;
    }
    return new User(
      token.userName,
      token.areas,
      token.authcode,
    );
  }

  public authorizationCodeFlow()
  {
    var baseUrl = environment.api.authServerUrl+'/connect/authorize';
    var queryParams = {
        redirect_uri: environment.api.authredirect+'/oauth/callback',
        client_id: 'ccweb',
        response_type: 'code id_token',
        scope: 'openid profile cc.api.super user.api.super ac.api.super',
        nonce: Math.floor((Math.random() * 1000) + 1)
    };
    window.location.href = baseUrl + '?' + this.buildQueryString(queryParams);
  }

  public buildQueryString(formData) {
    var dataString = '';
    for (var prop in formData) {
        if (formData.hasOwnProperty(prop)) {
            dataString += (prop + '=' + formData[prop] + '&');
        }
    }
    return dataString.slice(0, dataString.length - 1);
  }

  private convertToArray(val: string | string[]): string[] {
    if (typeof val === 'string') {
      return [val];
    }

    if (val instanceof Array) {
      return val;
    }

    return [];
  }
}
