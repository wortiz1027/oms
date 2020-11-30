import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ActualizarOrdenService {

  constructor(private httpClient: HttpClient,
    private svLoginService: LoginService) {
    console.log('Cancel Order service ready!!');
  }

  httpOptions = {
    headers: new HttpHeaders(),
    body: {}
  };

  cancelOrder(idOrden: string): Observable<any> {
    
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.svLoginService.getToken().valueOf());

    this.httpOptions.headers = headers;

    const result = this.httpClient
    .put<any>(environment.cancelOrder_endpoint + "/" + idOrden, "", this.httpOptions);

    return result;
  }

}
