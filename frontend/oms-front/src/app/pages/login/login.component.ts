import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { LoginService, ResponseService } from 'src/app/services/login/login.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  obs: Observable<any>;
  userToLogin: any = {};
  responseService: ResponseService;

  constructor(private _loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  loginUsersForm = this.formBuilder.group({
    username: ['', { validators: [Validators.required]}],
    password: ['', { validators: [Validators.required]}]
  });  

  ngOnInit(): void { }

  ngOnDestroy() { }

  loginUser() {
    console.log('Ingresó a login');

    /*
    if (this.loginUsersForm.invalid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }
    */
    
    this.userToLogin.username = this.loginUsersForm.get('username').value;
    this.userToLogin.password = this.loginUsersForm.get('password').value;

    alert('request: ' + JSON.stringify(this.userToLogin));

    this._loginService.userLogin(this.userToLogin).subscribe(
      (res) => {
        this.responseService = res;
        console.log('resService: ', this.responseService);
        this.responseService.username = this.userToLogin.username;
        this._loginService.setToken(this.responseService);
        this.router.navigate(['/dashboard']);
      },
      (res) => {
        console.log('error ' + JSON.stringify(res.status));
      }
    );
    console.log('token', this._loginService.getToken());
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.loginUsersForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }
  
    return mensaje;
  }

  verificarCampo(field: string): boolean{
    return ((this.loginUsersForm.get(field).dirty || this.loginUsersForm.get(field).touched) && 
            (this.loginUsersForm.get(field).invalid || this.loginUsersForm.get(field).errors?.required));
  }

}
