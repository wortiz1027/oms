import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestCrearUsuarioDTO } from 'src/app/models/RequestCrearUsuarioDTO';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrearUsuarioService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {
        console.log('Create Users service ready!!');
    }

    createUser(_body: RequestCrearUsuarioDTO): Observable<any> {
        _body.accountNonExpired = 'true';
        _body.credentialNonExpired = 'true';
        _body.accountNonLocket = 'true';
        _body.enable = 'true';

        const result = this.httpClient
            .post<any>(environment.createUser_endpoint, JSON.stringify(_body), this.httpOptions);

        return result;
    }

}