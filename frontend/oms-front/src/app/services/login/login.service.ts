import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';


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
    }

    userLogin(_body: UserToLoging): Observable<any> {
        console.log('Ingreso al servicio login');

        this.formData.append('client_id', environment.clientId_variable);
        this.formData.append('client_secret', environment.clientSecret_variable);
        this.formData.append('scope', 'read write');
        this.formData.append('grant_type', 'password');
        this.formData.append('username', _body.username);
        this.formData.append('password', _body.password);

        return this.httpClient
            .post<any>(environment.login_endpoint, this.formData);
    }

    setToken(userInformation: ResponseService) {
        this.cookies.set('token', userInformation.access_token);
        this.cookies.set('refreshToken', userInformation.refresh_token);
        this.decodeAccessToken(userInformation.access_token);
    }

    setUserInformation(username: string) {
        this.cookies.set('username', username);
    }

    getToken() {
        return this.cookies.get('token');
    }

    getRefreshToken() {
        return this.cookies.get('refreshToken');
    }

    getUserName() {
        let username = '';
        username = this.cookies.get('username');

        return username;
    }

    setRolesArray(roles: any[]) {
        this.cookies.set('roles', JSON.stringify(roles));
    }

    userLogout() {
        this.cookies.deleteAll();
        this.router.navigateByUrl('/loginOMS');
    }

    refreshToken() {

        this.formData.append('client_id', environment.clientId_variable);
        this.formData.append('client_secret', environment.clientSecret_variable);
        this.formData.append('grant_type', 'refresh_token');
        this.formData.append('refresh_token', this.getRefreshToken());

        this.httpClient
            .post<any>(environment.login_endpoint, this.formData).subscribe(
                (resRefresh) => {
                    this.responseService = resRefresh;
                    this.setToken(this.responseService);
                },
                (error) => {
                    console.log('Error {}', error);
                }
            );
    }

    decodeAccessToken(token: string) {
        let decodedToken: any;
        decodedToken = jwtDecode(token);
        const roles: string[] = decodedToken.authorities;
        console.log('Roles: ', roles);
        this.setRolesArray(roles);
    }

    validateRol(rol: string): boolean {
        let roles = this.cookies.get('roles');
        if (roles === null || roles === undefined || roles === '') {
            return false;
        }
        roles = JSON.parse(this.cookies.get('roles'));
        for (let i = 0; i < roles.length; i++) {
            if (rol === roles[i]) {
                return true;
            }
        }
        return false;
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
