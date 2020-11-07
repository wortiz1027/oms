import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data'
        })
    };
    responseService: ResponseService;

    formData = new FormData();

    constructor(private httpClient: HttpClient,
        private cookies: CookieService,
        private router: Router) {
        console.log('Users service ready!!');
    }

    userLogin(_body: UserToLoging): Observable<any> {
        console.log('Ingreso al servicio login');
        this.formData.append('client_id', environment.clientId_variable);
        this.formData.append('client_secret', environment.clientSecret_variable);
        this.formData.append('scope', 'read write');
        this.formData.append('grant_type', 'password');
        this.formData.append('username', _body.username);
        this.formData.append('password', _body.password);
        console.log("resquest login " + JSON.stringify(this.formData));
        return this.httpClient
            .post<any>(environment.login_endpoint, this.formData);
    }

    setToken(userInformation: ResponseService) {
        this.cookies.set('token', userInformation.access_token);
        this.cookies.set('username', userInformation.username);
    }

    getToken() {
        return this.cookies.get('token');
    }

    getUserName() {
        return this.cookies.get('username');
    }

    userLogout() {
        this.cookies.set('token', '');
        this.cookies.set('username', '');
        this.router.navigateByUrl('/login');
    }

}

export interface UserToLoging {
    grant_type: string;
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
    scope: string;
}

export interface ResponseService {
    access_token: string;
    expires_in: string;
    jti: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    username: string;
}
