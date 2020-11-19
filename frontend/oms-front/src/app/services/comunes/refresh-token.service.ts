import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestRefreshToken } from 'src/app/models/RequestRefreshToken';
import { ResponseRefreshToken } from 'src/app/models/ResponseRefreshToken';
import { environment } from 'src/environments/environment';

import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  responseService: ResponseRefreshToken;

  constructor(private httpClient: HttpClient,
              private svLoginService: LoginService) { 
    console.log('Refresh Token service ready!!');
    
  }

  refreshToken(_body: RequestRefreshToken): Observable<any> {
    const body = new HttpParams()
      .set('client_id', environment.clientId_variable)
      .set('client_secret', environment.clientSecret_variable)
      .set('grant_type', environment.grant_type_variable)
      .set('refresh_token', _body.refresh_token);

    return this.httpClient
      .post<any>(environment.login_endpoint, body);
  }

}
