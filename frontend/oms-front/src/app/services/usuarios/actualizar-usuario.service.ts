import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestCrearUsuarioDTO } from 'src/app/models/RequestCrearUsuarioDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ActualizarUsuarioService {

  httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(private httpClient: HttpClient,
              private svLoginService: LoginService) {
    console.log('Update Users service ready!!');
  }

  updateUser(_body: RequestCrearUsuarioDTO): Observable<any> {
    console.log('Entro Update Users!!');

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.svLoginService.getToken().valueOf());
    headers = headers.append('Content-Type', 'application/json');

    this.httpOptions.headers = headers;

    _body.accountNonExpired = 'true';
    _body.credentialNonExpired = 'true';
    _body.accountNonLocket = 'true';
    _body.enable = 'true';

    const result = this.httpClient
        .put<any>(environment.searchUser_endpoint, JSON.stringify(_body), this.httpOptions);

    return result;
}

}
