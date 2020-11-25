import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class EliminarProductoService {

  httpOptions = {
    headers: new HttpHeaders(),
    body: {}
  };

  constructor(private httpClient: HttpClient,
              private svLoginService: LoginService) {
    console.log('Delete Product service ready!!');
  }

  deleteProduct(_body: RequestCrearProductoDTO): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.svLoginService.getToken().valueOf());
    headers = headers.append('Content-Type', 'application/json');

    this.httpOptions.body = _body;

    this.httpOptions.headers = headers;

    const result = this.httpClient
        .delete<any>(environment.createProduct_variable, this.httpOptions);

    return result;
  }

}