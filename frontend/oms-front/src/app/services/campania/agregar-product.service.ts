import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestAgregarProductoDTO } from 'src/app/models/RequestAgregarProductoDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AgregarProductService {

  httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(private httpClient: HttpClient,
    private svLoginService: LoginService) {
    console.log('Add Product service ready!!');
  }

  addProductCampaign(_body: RequestAgregarProductoDTO): Observable<any> {

    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + this.svLoginService.getToken().valueOf());
    headers = headers.append('Content-Type', 'application/json');

    this.httpOptions.headers = headers;

    const result = this.httpClient
         .post<any>(environment.createCampaign_endpoint + "/products", JSON.stringify(_body), this.httpOptions);

    return result;
  }
}
