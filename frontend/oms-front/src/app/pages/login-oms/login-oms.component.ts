import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { LoginService, ResponseService } from 'src/app/services/login/login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-oms',
  templateUrl: './login-oms.component.html',
  styles: []
})
export class LoginOmsComponent implements OnInit, OnDestroy {

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
    
    if (this.loginUsersForm.invalid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }
    
    this.userToLogin.username = this.loginUsersForm.get('username').value;
    this.userToLogin.password = this.loginUsersForm.get('password').value;

    this._loginService.userLogin(this.userToLogin).subscribe(
      (res) => {
        this.responseService = res;

        this.responseService.username = this.userToLogin.username;
        this._loginService.setToken(this.responseService);
        this.router.navigate(['/dashboard']);
      },
      (res) => {
        if(res.error.error == "invalid_grant"){
          alert("Por favor verifique el usuario y contraseña");
        }
        console.log('error ' + JSON.stringify(res.status));
      }
    );
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
