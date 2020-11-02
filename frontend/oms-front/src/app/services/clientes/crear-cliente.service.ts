import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ClienteDTO } from 'src/app/models/ClienteDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrearClienteService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {
        console.log('Users service ready!!');
    }

    createUser(_body: ClienteDTO): Observable<any> {
        _body.accountNonExpired = 'true';
        _body.credentialNonExpired = 'true';
        _body.accountNonLocket = 'true';
        _body.enable = 'true';
        console.log('Consume UserService2: ', _body);
        const result = this.httpClient
            .post<any>(environment.createUser_endpoint, JSON.stringify(_body), this.httpOptions);

        console.log(JSON.stringify(result));
        console.log(result);

        return result;
    }

}