
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseCrearUsuarioDTO } from 'src/app/models/ResponseCrearUsuarioDTO';
import { RolesUsuario } from 'src/app/models/RolesUsuario';
import { StatusCliente } from 'src/app/models/StatusCliente';
import { RequestCrearUsuarioDTO } from 'src/app/models/RequestCrearUsuarioDTO';
import { StatusClienteService } from 'src/app/services/comunes/status-cliente.service';
import { CrearUsuarioService } from 'src/app/services/usuarios/crear-usuario.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-creacion-cliente',
  templateUrl: './creacion-cliente.component.html',
  styles: [],
  providers: [StatusClienteService]
})
export class CreacionClienteComponent implements OnInit {

  private emailValido = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$";
  public minDate: Date;
  public maxDate: Date;
  public listStatusCliente: StatusCliente[];
  cliente: RequestCrearUsuarioDTO;
  typeCliente: StatusCliente;

  responseService: ResponseCrearUsuarioDTO;
  
  constructor(private formBuilder: FormBuilder,
              private svStatusCliente : StatusClienteService,
              private svCrearCliente: CrearUsuarioService,
              private svLogin: LoginService,
              private router: Router) { 
    
              //Se establece la fecha minima y maxima
              this.minDate = new Date(1900, 1, 1);
              this.maxDate = new Date();  
  }

  registerClientesForm = this.formBuilder.group({
    identificacion: ['', { validators: [Validators.required]}],
    nombres: ['', { validators: [Validators.required]}],
    apellidos: ['', { validators: [Validators.required]}],
    fechaNacimiento: ['', { validators: [Validators.required]}],
    direccion: ['', { validators: [Validators.required]}],
    telefono: ['', { validators: [Validators.required]}],
    email: ['', { validators: [Validators.required, Validators.pattern(this.emailValido)]}],
   
    nombreUsuario: ['', { validators: [Validators.required]}],
    password: ['', { validators: [Validators.required]}],
    statusCliente: ['', { validators: [Validators.required]}]

  });

  ngOnInit(){
    this.listStatusCliente = this.svStatusCliente.getListStatusCliente(); 
  }

  crearCliente() {
    if (!this.registerClientesForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }

    this.cliente = {};
    this.typeCliente = new StatusCliente();
    
    this.typeCliente = this.getTypeCliente(this.registerClientesForm.get('statusCliente').value);

    var listRoles = new Array<RolesUsuario>();

    var rol = new RolesUsuario;
    rol.idRole = "3";
    rol.role = "ROLE_CLIENT";

    listRoles.push(rol);

    var rol = new RolesUsuario;
    rol.idRole = "10";
    rol.role = "ROLE_CLIENTES_CONSULTA";

    listRoles.push(rol);

    this.cliente.codigo = this.registerClientesForm.get('identificacion').value;
    this.cliente.cedula = this.registerClientesForm.get('identificacion').value;
    this.cliente.nombres = this.registerClientesForm.get('nombres').value;
    this.cliente.apellidos = this.registerClientesForm.get('apellidos').value;
    this.cliente.fechaNacimiento = this.registerClientesForm.get('fechaNacimiento').value;
    this.cliente.direccion = this.registerClientesForm.get('direccion').value;
    this.cliente.telefono = this.registerClientesForm.get('telefono').value;
    this.cliente.email = this.registerClientesForm.get('email').value;
    this.cliente.username = this.registerClientesForm.get('nombreUsuario').value;
    this.cliente.password = this.registerClientesForm.get('password').value;
    this.cliente.types = this.typeCliente;
    this.cliente.roles = listRoles;

    this.svCrearCliente.createUser(this.cliente).subscribe(
      (res) => {
        this.responseService = res;

        if(this.responseService.status.code == "SUCCESS"){
          alert("Usuario Creado !!!");
          this.limpiar();
          this.svLogin.refreshToken();
          this.router.navigate(['crearCliente']);  
        } 
      },
      (res) => {
        if(res.status == 401){
          this.svLogin.userLogout();
        }
        console.log('error ' + JSON.stringify(res.status));
      }
    ); 
  
  }

  limpiar() {
    this.registerClientesForm.patchValue({
      identificacion: '',
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      direccion: '',
      telefono: '',
      email: '',
      nombreUsuario: '',
      password: ''
    });
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.registerClientesForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }else if(this.registerClientesForm.get(field).hasError('pattern')){
      mensaje = 'Ingrese un email valido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.registerClientesForm.get(field).dirty || this.registerClientesForm.get(field).touched) && 
            (this.registerClientesForm.get(field).invalid || this.registerClientesForm.get(field).errors?.required));
  }

  getTypeCliente(field: string): StatusCliente{
    let typeCliente = new StatusCliente();

    switch (field) {
      case '1':
        typeCliente.type = field;
        typeCliente.code = "PLT";
        typeCliente.description = "Platino";
        break;
      case '2':
        typeCliente.type = field;
        typeCliente.code = "DRD";
        typeCliente.description = "Dorado";
        break;
      default:
        typeCliente.type = field;
        typeCliente.code = "PLO";
        typeCliente.description = "Plateado";
    }

    return typeCliente;
  }

}
