import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle-campania',
  templateUrl: './detalle-campania.component.html',
  styles: []
})
export class DetalleCampaniaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
  
  }

  detalleCampaniasForm = this.formBuilder.group({
    codigo: ['', { validators: [Validators.required]}],
    nombre: ['', { validators: [Validators.required]}],
    descripcion: ['', { validators: [Validators.required]}],
    fechaInicial: ['', { validators: [Validators.required]}],
    fechaFinal: ['', { validators: [Validators.required]}],
    descuento: ['', { validators: [Validators.required]}],
    activa: ['', { validators: [Validators.required]}]
  });

  ngOnInit(){

  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.detalleCampaniasForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.detalleCampaniasForm.get(field).dirty || this.detalleCampaniasForm.get(field).touched) && 
            (this.detalleCampaniasForm.get(field).invalid || this.detalleCampaniasForm.get(field).errors?.required));
  }

}


