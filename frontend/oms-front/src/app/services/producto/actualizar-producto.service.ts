import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ActualizarProductoService {

  httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(private httpClient: HttpClient,
              private svLoginService: LoginService) {
    console.log('Update Product service ready!!');
  }

  updateProduct(_body: RequestCrearProductoDTO): Observable<any> {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.svLoginService.getToken().valueOf());
    headers = headers.append('Content-Type', 'application/json');

    this.httpOptions.headers = headers;

    const result = this.httpClient
        .put<any>(environment.createProduct_endpoint, JSON.stringify(_body), this.httpOptions);

    return result;
  }

}
