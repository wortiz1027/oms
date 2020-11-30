import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBuscarOrdenDTO } from 'src/app/models/RequestBuscarOrdenDTO';
import { ResponseBuscarOrdenDTO } from 'src/app/models/ResponseBuscarOrdenDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarOrdenService {

  constructor(private httpClient: HttpClient,
    private svLogin: LoginService) {
 
    console.log('Search Order service ready!!');
  }

  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Bearer ' + this.svLogin.getToken()}),
    params:{}
  };

  buscarOrdenText(_body: RequestBuscarOrdenDTO): Observable<ResponseBuscarOrdenDTO> {
    return this.httpClient
      .get<ResponseBuscarOrdenDTO>(environment.searchOrder_endpoint + "/" + _body.text, this.httpOptions);
  }

  buscarOrdenes(_body: RequestBuscarOrdenDTO): Observable<ResponseBuscarOrdenDTO> {
    return this.httpClient
      .get<ResponseBuscarOrdenDTO>(environment.searchOrder_endpoint + "/all/open/" + "?page=" + _body.page + "&size=" + _body.size, this.httpOptions);
  }

  buscarDetalleOrder(idOrden: string): Observable<ResponseBuscarOrdenDTO> {

    return this.httpClient
      .get<ResponseBuscarOrdenDTO>(environment.searchOrder_endpoint + "/detail/" + idOrden, this.httpOptions);
  }
}
