import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteDTO } from 'src/app/models/ClienteDTO';
import { ResponseCrearClienteDTO } from 'src/app/models/ResponseCrearClienteDTO';
import { RolesCliente } from 'src/app/models/RolesCliente';
import { StatusCliente } from 'src/app/models/StatusCliente';
import { CrearClienteService } from 'src/app/services/clientes/crear-cliente.service';
import { RolesClienteService } from 'src/app/services/comunes/roles-cliente.service';

import { StatusClienteService } from 'src/app/services/comunes/status-cliente.service';

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
  public listRolesCliente: RolesCliente[];
  cliente: ClienteDTO;
  typeCliente: StatusCliente;
  rolesCliente: RolesCliente[];

  responseService: ResponseCrearClienteDTO;
  
  constructor(private formBuilder: FormBuilder,
              private svStatusCliente : StatusClienteService,
              private svRolesCliente : RolesClienteService,
              private _crearCliente: CrearClienteService,
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
    statusCliente: ['', { validators: [Validators.required]}],
    nombreUsuario: ['', { validators: [Validators.required]}],
    password: ['', { validators: [Validators.required]}],
    roles: this.formBuilder.array([], [Validators.required])

  });

  ngOnInit(){
    this.listStatusCliente = this.svStatusCliente.getListStatusCliente();
    this.listRolesCliente = this.svRolesCliente.getListRoles();   
  }

  crearCliente() {
    if (!this.registerClientesForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }

    this.cliente = {};
    this.typeCliente = new StatusCliente();
    this.rolesCliente = new Array<RolesCliente>();
    
    this.typeCliente = this.getTypeCliente(this.registerClientesForm.get('statusCliente').value);
    this.rolesCliente = this.getRolesCliente(this.registerClientesForm.get('roles').value);

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
    this.cliente.roles = this.rolesCliente;

    console.log("Final!!! " +  JSON.stringify(this.cliente));

    this._crearCliente.createUser(this.cliente).subscribe(
      (res) => {
        this.responseService = res;
        alert("Usuario Creado !!!");
        this.router.navigate(['crearCliente']);
      },
      (res) => {
        console.log('error ' + JSON.stringify(res.status));
      }
    ); 
  
  }

  refrescar() {
    this.registerClientesForm.patchValue({
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      direccion: '',
      telefono: '',
      email: '',
      statusCliente: '',
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
  
  getRolesCliente(list: string[]): RolesCliente[]{
    let listRolesCliente = new Array<RolesCliente>();

    console.log("list leng " + list.length);

    if(list != null && list.length > 0){
      for(let i = 0; i < list.length; i++){
        let rolCliente = new RolesCliente();
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
    const roles: FormArray = this.registerClientesForm.get('roles') as FormArray;

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
