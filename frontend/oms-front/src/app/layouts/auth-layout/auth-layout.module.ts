import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthLayoutRoutes} from './auth-layout.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {RegisterComponent} from '../../pages/register/register.component';
import { LoginService } from 'src/app/services/login/login.service';
import { CrearUsuarioService } from 'src/app/services/usuarios/crear-usuario.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule
    // NgbModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers: [
    LoginService,
    CrearUsuarioService
  ]
})
export class AuthLayoutModule {
}
