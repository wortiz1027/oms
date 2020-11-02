import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteDTO } from 'src/app/models/ClienteDTO';
import { ResponseCrearClienteDTO } from 'src/app/models/ResponseCrearClienteDTO';
import { RolesCliente } from 'src/app/models/RolesCliente';
import { StatusCliente } from 'src/app/models/StatusCliente';
import { CrearClienteService } from 'src/app/services/clientes/crear-cliente.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  cliente: ClienteDTO;
  responseService: ResponseCrearClienteDTO;

  constructor(private formBuilder: FormBuilder,
              private _crearCliente: CrearClienteService,
              private router: Router) { 

  }
  
  private emailValido = '^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$';

  registerUsersForm = this.formBuilder.group({
    identificationNumber: ['', { validators: [Validators.required] }],
    firstName: ['', { validators: [Validators.required] }],
    lastName: ['', { validators: [Validators.required] }],
    address: ['', { validators: [Validators.required] }],
    birthdate: ['', { validators: [Validators.required] }],
    phone: ['', { validators: [Validators.required] }],
    email: ['', { validators: [Validators.required, Validators.pattern(this.emailValido)] }],
    username: ['', { validators: [Validators.required] }],
    password: ['', { validators: [Validators.required] }]
  });

  ngOnInit() {
  }

  createUser() {
    this.cliente = {};
    
    if (this.registerUsersForm.invalid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }
    var listRoles = new Array<RolesCliente>();

    var rol = new RolesCliente;
    rol.idRole = "3";
    rol.role = "ROLE_CLIENT";

    listRoles.push(rol);

    var rol = new RolesCliente;
    rol.idRole = "10";
    rol.role = "ROLE_CLIENTES_CONSULTA";

    listRoles.push(rol);

    var statusCliente = new StatusCliente;
    statusCliente.type = "3";
    statusCliente.code = "PLO";
    statusCliente.description = "Plateado";

    this.cliente.codigo = this.registerUsersForm.get('identificationNumber').value;
    this.cliente.cedula = this.registerUsersForm.get('identificationNumber').value;
    this.cliente.nombres = this.registerUsersForm.get('firstName').value;
    this.cliente.apellidos = this.registerUsersForm.get('lastName').value;
    this.cliente.fechaNacimiento = this.registerUsersForm.get('birthdate').value;
    this.cliente.direccion = this.registerUsersForm.get('address').value;
    this.cliente.telefono = this.registerUsersForm.get('phone').value;
    this.cliente.email = this.registerUsersForm.get('email').value;
    this.cliente.username = this.registerUsersForm.get('username').value;
    this.cliente.password = this.registerUsersForm.get('password').value;
    this.cliente.roles = listRoles;
    this.cliente.types = statusCliente;

    this._crearCliente.createUser(this.cliente).subscribe(
      (res) => {
        this.responseService = res;
        alert("Usuario Creado !!!");
        this.router.navigate(['dashboard']);
      },
      (res) => {
        console.log('error ' + JSON.stringify(res.status));
      }
    );
  }

  getMensajeError(field: string): string {
    let mensaje: string;

    if (this.registerUsersForm.get(field).errors.required) {
      mensaje = 'El campo es requerido';
    } else if (this.registerUsersForm.get(field).hasError('pattern')) {
      mensaje = 'Ingrese un valor válido';
    }

    return mensaje;
  }

  verificarCampo(field: string): boolean {
    return ((this.registerUsersForm.get(field).dirty || this.registerUsersForm.get(field).touched) &&
      !this.registerUsersForm.get(field).valid);
  }

}
