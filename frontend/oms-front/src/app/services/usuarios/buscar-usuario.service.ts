import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBuscarUsuarioDTO } from 'src/app/models/RequestBuscarUsuarioDTO';
import { ResponseBuscarUsuarioDTO } from 'src/app/models/ResponseBuscarUsuarioDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuarioService {

  httpOptions = {
    headers: new HttpHeaders()
  };
  
  constructor(private httpClient: HttpClient) {
           
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

}
