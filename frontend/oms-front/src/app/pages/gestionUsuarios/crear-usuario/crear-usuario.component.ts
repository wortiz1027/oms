import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseCrearUsuarioDTO } from 'src/app/models/ResponseCrearUsuarioDTO';
import { RolesUsuario } from 'src/app/models/RolesUsuario';
import { StatusCliente } from 'src/app/models/StatusCliente';
import { RequestCrearUsuarioDTO } from 'src/app/models/RequestCrearUsuarioDTO';
import { RolesUsuarioService } from 'src/app/services/comunes/roles-usuario.service';
import { CrearUsuarioService } from 'src/app/services/usuarios/crear-usuario.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styles: []
})
export class CrearUsuarioComponent implements OnInit {

  private emailValido = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$";
  public minDate: Date;
  public maxDate: Date;
  public listRolesUsuario: RolesUsuario[];
  usuario: RequestCrearUsuarioDTO;
  typeCliente: StatusCliente;
  rolesUsuario: RolesUsuario[];

  responseService: ResponseCrearUsuarioDTO;
  
  constructor(private formBuilder: FormBuilder,
              private svRolesUsuario : RolesUsuarioService,
              private svCrearUsuario: CrearUsuarioService,
              private svLogin: LoginService,
              private router: Router) { 
    
              //Se establece la fecha minima y maxima
              this.minDate = new Date(1900, 1, 1);
              this.maxDate = new Date();  
  }

  registerUsuariosForm = this.formBuilder.group({
    identificacion: ['', { validators: [Validators.required]}],
    nombres: ['', { validators: [Validators.required]}],
    apellidos: ['', { validators: [Validators.required]}],
    fechaNacimiento: ['', { validators: [Validators.required]}],
    direccion: ['', { validators: [Validators.required]}],
    telefono: ['', { validators: [Validators.required]}],
    email: ['', { validators: [Validators.required, Validators.pattern(this.emailValido)]}],
    nombreUsuario: ['', { validators: [Validators.required]}],
    password: ['', { validators: [Validators.required]}],
    roles: this.formBuilder.array([], [Validators.required])

  });

  ngOnInit(){
    this.listRolesUsuario = this.svRolesUsuario.getListRoles();   
  }

  crearUsuario() {
    if (!this.registerUsuariosForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }

    this.usuario = {};
    this.rolesUsuario = new Array<RolesUsuario>();
    
    this.rolesUsuario = this.getRolesUsuario(this.registerUsuariosForm.get('roles').value);

    var statusCliente = new StatusCliente;
    statusCliente.type = "3";
    statusCliente.code = "PLO";
    statusCliente.description = "Plateado";

    this.usuario.codigo = this.registerUsuariosForm.get('identificacion').value;
    this.usuario.cedula = this.registerUsuariosForm.get('identificacion').value;
    this.usuario.nombres = this.registerUsuariosForm.get('nombres').value;
    this.usuario.apellidos = this.registerUsuariosForm.get('apellidos').value;
    this.usuario.fechaNacimiento = this.registerUsuariosForm.get('fechaNacimiento').value;
    this.usuario.direccion = this.registerUsuariosForm.get('direccion').value;
    this.usuario.telefono = this.registerUsuariosForm.get('telefono').value;
    this.usuario.email = this.registerUsuariosForm.get('email').value;
    this.usuario.username = this.registerUsuariosForm.get('nombreUsuario').value;
    this.usuario.password = this.registerUsuariosForm.get('password').value;
    this.usuario.roles = this.rolesUsuario;
    this.usuario.types = statusCliente;

    this.svCrearUsuario.createUser(this.usuario).subscribe(
      (res) => {
        this.responseService = res;

        if(this.responseService.status.code == "SUCCESS"){
          alert("Usuario Creado !!!");
          this.limpiar();
          this.svLogin.refreshToken();
          this.router.navigate(['crearUsuario']);  
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
    this.registerUsuariosForm.patchValue({
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
  
    if(this.registerUsuariosForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }else if(this.registerUsuariosForm.get(field).hasError('pattern')){
      mensaje = 'Ingrese un email valido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.registerUsuariosForm.get(field).dirty || this.registerUsuariosForm.get(field).touched) && 
            (this.registerUsuariosForm.get(field).invalid || this.registerUsuariosForm.get(field).errors?.required));
  }

  getRolesUsuario(list: string[]): RolesUsuario[]{
    let listRolesCliente = new Array<RolesUsuario>();

    if(list != null && list.length > 0){
      for(let i = 0; i < list.length; i++){
        let rolCliente = new RolesUsuario();
        let field = list[i];
    
        switch (field) {
          case '1':
            rolCliente.idRole = String(field);
            rolCliente.role = "ROLE_ADMIN";
            break;
          case '2':
            rolCliente.idRole = String(field);
            rolCliente.role = "ROLE_USER";
            break;
          case '3':
            rolCliente.idRole = String(field);
            rolCliente.role = "ROLE_CLIENT";
            break;
          case '4':
            rolCliente.idRole = String(field);
            rolCliente.role = "ROLE_GUEST";
            break;
          case '5':
            rolCliente.idRole = String(field);
            rolCliente.role = "ROLE_PRODUCTOS_CONSULTA";
            break;
          case '6':
            rolCliente.idRole = String(field);
            rolCliente.role = "ROLE_PRODUCTOS_ADMON";
            break;
          case '7':
            rolCliente.idRole = String(field);
            rolCliente.role = "ROLE_CAMPANAS";
            break;
          case '8':
            rolCliente.idRole = String(field);
            rolCliente.role = "ROLE_ORDENES_CONSULTA";
            break;
          case '9':
            rolCliente.idRole = String(field);
            rolCliente.role = "ROLE_ORDENES_ADMON";
            break;
          case '10':
            rolCliente.idRole = String(field);
            rolCliente.role = "ROLE_CLIENTES_CONSULTA";
            break;
          default:
            rolCliente.idRole = String(field);
            rolCliente.role = "ROLE_CLIENTES_ADMON";
        }
        listRolesCliente.push(rolCliente);
      }
    }

    return listRolesCliente;
  } 
  
  onCheckboxChange(e) {
    const roles: FormArray = this.registerUsuariosForm.get('roles') as FormArray;

    if (e.target.checked) {
      roles.push(new FormControl(e.target.value));
    }else {
      let i: number = 0;
      roles.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          roles.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
