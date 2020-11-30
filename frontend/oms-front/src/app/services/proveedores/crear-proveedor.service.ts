import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestCrearProveedorDTO } from 'src/app/models/RequestCrearProveedorDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CrearProveedorService {

  httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(private httpClient: HttpClient,
    private svLoginService: LoginService) {
    console.log('Create Vendor service ready!!');
  }

  createVendor(_body: RequestCrearProveedorDTO): Observable<any> {

    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + this.svLoginService.getToken().valueOf());
    headers = headers.append('Content-Type', 'application/json');

    this.httpOptions.headers = headers;

    const result = this.httpClient
         .post<any>(environment.createVendor_endpoint, JSON.stringify(_body), this.httpOptions);

    return result;
  }
}
