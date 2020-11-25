import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBuscarCampaniaDTO } from 'src/app/models/RequestBuscarCampaniaDTO';
import { ResponseBuscarCampaniaDTO } from 'src/app/models/ResponseBuscarCampaniaDTO';
import { ResponseBuscarProductoCampaniaDTO } from 'src/app/models/ResponseBuscarProductoCampaniaDTO';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarCampaniaService {

  constructor(private httpClient: HttpClient,
    private svLogin: LoginService) {
 
    console.log('Search Campaign service ready!!');
  }

  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Bearer ' + this.svLogin.getToken()}),
    params:{}
  };

  buscarCampaniaText(_body: RequestBuscarCampaniaDTO): Observable<ResponseBuscarCampaniaDTO> {
    let formData = new FormData();
    let params = new HttpParams();

    params = params.append('page', _body.page);
    params = params.append('size', _body.size);

    this.httpOptions.params = params;

    formData.delete('text');
    formData.append('text', '' + _body.text + '');
    
    return this.httpClient
      .post<ResponseBuscarCampaniaDTO>(environment.searchCampaign_endpoint+"/text", formData, this.httpOptions);
  }

  buscarCampañas(_body: RequestBuscarCampaniaDTO): Observable<ResponseBuscarCampaniaDTO> {
    return this.httpClient
      .get<ResponseBuscarCampaniaDTO>(environment.searchCampaign_endpoint + "?page=" + _body.page + "&size=" + _body.size, this.httpOptions);
  }

  buscarDetalleCampaña(codigoCampania: string): Observable<ResponseBuscarCampaniaDTO> {
    let params = new HttpParams();
        params = params.append('code', codigoCampania);
        this.httpOptions.params = params;

    return this.httpClient
      .get<ResponseBuscarCampaniaDTO>(environment.searchCampaign_endpoint + "/details", this.httpOptions);
  }

  buscarProductoCampaña(_body: RequestBuscarCampaniaDTO): Observable<ResponseBuscarProductoCampaniaDTO> {
    let params = new HttpParams();

    params = params.append('page', _body.page);
    params = params.append('size', _body.size);

    this.httpOptions.params = params;

    return this.httpClient
      .get<ResponseBuscarProductoCampaniaDTO>(environment.searchCampaign_endpoint + 
        "/" + _body.text + "/products", this.httpOptions);
    }
}
