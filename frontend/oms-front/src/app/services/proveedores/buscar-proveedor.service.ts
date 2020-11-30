import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBuscarProveedoresDTO } from 'src/app/models/ResponseBuscarProveedoresDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarProveedorService {

  constructor(private httpClient: HttpClient,
    private svLogin: LoginService) {
 
    console.log('Search Vendor service ready!!');
  }

  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Bearer ' + this.svLogin.getToken()}),
    params:{}
  };

  buscarProveedores(): Observable<ResponseBuscarProveedoresDTO> {
    return this.httpClient
      .get<ResponseBuscarProveedoresDTO>(environment.searchVendor_endpoint, this.httpOptions);
  }
}
