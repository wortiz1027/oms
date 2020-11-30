import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBuscarTipoProveedoresDTO } from 'src/app/models/ResponseBuscarTipoProveedoresDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  constructor(private httpClient: HttpClient,
    private svLogin: LoginService) {
 
    console.log('Search Type Product service ready!!');
  }

  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Bearer ' + this.svLogin.getToken()}),
    params:{}
  };

  buscarTipoProductos(): Observable<ResponseBuscarTipoProveedoresDTO> {
    return this.httpClient
      .post<ResponseBuscarTipoProveedoresDTO>(environment.searchProduct_endpoint + "/types", "", this.httpOptions);
  }
  
}