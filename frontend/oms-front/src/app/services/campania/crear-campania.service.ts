import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestCrearCampaniaDTO } from 'src/app/models/RequestCrearCampaniaDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CrearCampaniaService {

  httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(private httpClient: HttpClient,
    private svLoginService: LoginService) {
    console.log('Create Campaing service ready!!');
  }

  createCampaign(_body: RequestCrearCampaniaDTO): Observable<any> {

    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('Authorization', 'Bearer ' + this.svLoginService.getToken().valueOf());
    headers = headers.append('Content-Type', 'application/json');

    this.httpOptions.headers = headers;

    const result = this.httpClient
         .post<any>(environment.createCampaign_endpoint, JSON.stringify(_body), this.httpOptions);

    return result;
  }
}
