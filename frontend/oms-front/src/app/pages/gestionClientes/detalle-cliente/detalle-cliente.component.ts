import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StatusClienteI } from 'src/app/models/StatusCliente';
import { StatusClienteService } from 'src/app/services/comunes/status-cliente.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styles: [],
  providers: [StatusClienteService]
})
export class DetalleClienteComponent implements OnInit {

  private emailValido = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$";
  public minDate: Date;
  public maxDate: Date;
  public listStatusCliente: StatusClienteI[];

  constructor(private formBuilder: FormBuilder,
    private svStatusCLiente : StatusClienteService) { 

    //Se establece la fecha minima y maxima
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(1900, 1, 1);
    this.maxDate = new Date();  
  }

  detalleClientesForm = this.formBuilder.group({
    identificacion: ['', { validators: [Validators.required]}],
    nombres: ['', { validators: [Validators.required]}],
    apellidos: ['', { validators: [Validators.required]}],
    fechaNacimiento: ['', { validators: [Validators.required]}],
    direccion: ['', { validators: [Validators.required]}],
    telefono: ['', { validators: [Validators.required]}],
    email: ['', { validators: [Validators.required, Validators.pattern(this.emailValido)]}],
    statusCliente: ['', { validators: [Validators.required]}]
  });

  ngOnInit(){
    this.listStatusCliente = this.svStatusCLiente.getListStatusCliente();
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.detalleClientesForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }else if(this.detalleClientesForm.get(field).hasError('pattern')){
      mensaje = 'Ingrese un email valido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.detalleClientesForm.get(field).dirty || this.detalleClientesForm.get(field).touched) && 
            (this.detalleClientesForm.get(field).invalid || this.detalleClientesForm.get(field).errors?.required));
  }

}