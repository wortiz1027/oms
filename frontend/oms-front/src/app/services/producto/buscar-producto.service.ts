import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBuscarProductoDTO } from 'src/app/models/RequestBuscarProductoDTO';
import { ResponseBuscarProductoDTO } from 'src/app/models/ResponseBuscarProductoDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarProductoService {

  constructor(private httpClient: HttpClient,
              private svLogin: LoginService) {
           
    console.log('Search Product service ready!!');
  }

  formData = new FormData();

  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Bearer ' + this.svLogin.getToken()}),
    params:{}
  };
  
  buscarProductoText(_body: RequestBuscarProductoDTO): Observable<ResponseBuscarProductoDTO> {
    let formData = new FormData();
    let params = new HttpParams();

    params = params.append('page', _body.page);
    params = params.append('size', _body.size);

    this.httpOptions.params = params;

    formData.delete('text');
    formData.append('text', '' + _body.text + '');
    
    return this.httpClient
      .post<ResponseBuscarProductoDTO>(environment.searchProduct_endpoint+"/text", formData, this.httpOptions);
  }

  buscarProductos(_body: RequestBuscarProductoDTO): Observable<ResponseBuscarProductoDTO> {
    return this.httpClient
      .get<ResponseBuscarProductoDTO>(environment.searchProduct_endpoint + "?page=" + _body.page + "&size=" + _body.size, this.httpOptions);
  }

}
