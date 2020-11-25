import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBuscarUsuarioDTO } from 'src/app/models/RequestBuscarUsuarioDTO';
import { ResponseBuscarUsuarioDTO } from 'src/app/models/ResponseBuscarUsuarioDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuarioService {

  httpOptions = {
    headers: new HttpHeaders(),
    params:{}
  };
  
  constructor(private httpClient: HttpClient,
              private svLogin: LoginService) {
           
    console.log('Search Users service ready!!');
  }

  buscarUsuarioCedula(_body: RequestBuscarUsuarioDTO): Observable<ResponseBuscarUsuarioDTO> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + _body.token);

    this.httpOptions.headers = headers;

    return this.httpClient
      .get<ResponseBuscarUsuarioDTO>(environment.searchUser_endpoint + "/identifications?cedula=" + _body.cedula, this.httpOptions);
  }

  buscarUsuarios(_body: RequestBuscarUsuarioDTO): Observable<ResponseBuscarUsuarioDTO> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + _body.token);

    this.httpOptions.headers = headers;

    return this.httpClient
      .get<ResponseBuscarUsuarioDTO>(environment.searchUser_endpoint + "?page=" + _body.page + "&size=" + _body.size, this.httpOptions);
  }

  buscarDetalleUsuario(numIdentificacion: string): Observable<ResponseBuscarUsuarioDTO> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.svLogin.getToken());

    this.httpOptions.headers = headers;

    let params = new HttpParams();
        params = params.append('cedula', numIdentificacion);
        this.httpOptions.params = params;

    return this.httpClient
      .get<ResponseBuscarUsuarioDTO>(environment.searchUser_endpoint + "/identifications", this.httpOptions);
  }

}
