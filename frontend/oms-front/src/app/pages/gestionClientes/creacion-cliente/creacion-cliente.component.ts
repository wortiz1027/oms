import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteDTO } from 'src/app/models/ClienteDTO';
import { StatusClienteI } from 'src/app/models/StatusCliente';
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
  public listStatusCliente: StatusClienteI[];
  
  cliente: ClienteDTO;
  

  constructor(private formBuilder: FormBuilder,
              private svStatusCLiente : StatusClienteService) { 
    
              //Se establece la fecha minima y maxima
              const currentYear = new Date().getFullYear();
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
    password: ['', { validators: [Validators.required]}]
  });

  ngOnInit(){
    this.listStatusCliente = this.svStatusCLiente.getListStatusCliente();
  }

  crearCliente() {
      
    if (!this.registerClientesForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }

    this.cliente.cedula = this.registerClientesForm.get('identificacion').value;
    this.cliente.nombres = this.registerClientesForm.get('nombres').value;
    this.cliente.apellidos = this.registerClientesForm.get('apellidos').value;
    this.cliente.fechaNacimiento = this.registerClientesForm.get('fechaNacimiento').value;
    this.cliente.direccion = this.registerClientesForm.get('direccion').value;
    this.cliente.telefono = this.registerClientesForm.get('telefono').value;
    this.cliente.email = this.registerClientesForm.get('email').value;
    this.cliente.statusCliente = this.registerClientesForm.get('statusCliente').value;
    this.cliente.username = this.registerClientesForm.get('nombreUsuario').value;
    this.cliente.password = this.registerClientesForm.get('password').value;

    //this._userService.createUser(this.userToCreate).subscribe();
    
    console.log(this.registerClientesForm.value);
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

}
