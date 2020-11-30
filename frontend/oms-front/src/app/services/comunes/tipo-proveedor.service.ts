import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBuscarTipoProveedoresDTO } from 'src/app/models/ResponseBuscarTipoProveedoresDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable()

export class TipoProveedorService {

  constructor(private httpClient: HttpClient,
    private svLogin: LoginService) {
 
    console.log('Search Type Vendor service ready!!');
  }

  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Bearer ' + this.svLogin.getToken()}),
    params:{}
  };

  buscarTipoProveedores(): Observable<ResponseBuscarTipoProveedoresDTO> {
    return this.httpClient
      .get<ResponseBuscarTipoProveedoresDTO>(environment.searchVendor_endpoint + "/types", this.httpOptions);
  }
}
