import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CancelarOrdenBpmService {

  constructor(private httpClient: HttpClient,
    private svLoginService: LoginService) {
    console.log('Cancel Order BPM service ready!!');
  }

  httpOptions = {
    headers: new HttpHeaders(),
    body: {}
  };

  cancelOrderBPM(idOrden: string): Observable<any> {
    
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.svLoginService.getToken().valueOf());
    headers = headers.append('Content-Type', 'application/json');

    let requestCancel: any = {};
    requestCancel.numeroSolicitud = idOrden;

    this.httpOptions.headers = headers;

    const result = this.httpClient
         .post<any>(environment.cancelOrderBPM_endpoint, JSON.stringify(requestCancel), this.httpOptions);

    return result;
  }

}
