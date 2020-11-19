import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestCrearUsuarioDTO } from 'src/app/models/RequestCrearUsuarioDTO';
import { StatusCliente } from 'src/app/models/StatusCliente';
import { StatusClienteService } from 'src/app/services/comunes/status-cliente.service';

@Component({
  selector: 'app-detalle-cliente-edit',
  templateUrl: './detalle-cliente-edit.component.html',
  styles: [],
  providers: [StatusClienteService]
})
export class DetalleClienteEditComponent implements OnInit {

  private emailValido = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$";
  public minDate: Date;
  public maxDate: Date;
  public listStatusCliente: StatusCliente[];

  @Input() cliente: RequestCrearUsuarioDTO;
  @Input() readonly: Boolean;
  @Output() sendDetalleCliente = new EventEmitter<DetalleClienteEditComponent>();

  constructor(private formBuilder: FormBuilder,
    private svStatusCLiente : StatusClienteService) { 

    //Se establece la fecha minima y maxima
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
    this.sendDetalleCliente.emit(this);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cliente.currentValue) {
      let cliente: RequestCrearUsuarioDTO = changes.cliente.currentValue;
      this.detalleClientesForm.controls['identificacion'].setValue(cliente.cedula);
      this.detalleClientesForm.controls['nombres'].setValue(cliente.nombres);
      this.detalleClientesForm.controls['apellidos'].setValue(cliente.apellidos);
      this.detalleClientesForm.controls['fechaNacimiento'].setValue(cliente.fechaNacimiento);
      this.detalleClientesForm.controls['direccion'].setValue(cliente.direccion);
      this.detalleClientesForm.controls['telefono'].setValue(cliente.telefono);
      this.detalleClientesForm.controls['email'].setValue(cliente.email);
      this.detalleClientesForm.controls['statusCliente'].setValue(cliente.types.type);
      
    }
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

