import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InfoOrdenI } from 'src/app/models/InfoOrden';
import { ProductI } from 'src/app/models/Product';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styles: []
})
export class DetalleOrdenComponent implements OnInit {

  @Input() orden: InfoOrdenI;
  
  @Output() sendDetalleOrden = new EventEmitter<DetalleOrdenComponent>();

  lstProductosOrden: ProductI[];
  visibilidadTabla: Boolean;
  totalRecords: number;
  first: number = 0;

  constructor(private formBuilder: FormBuilder) {
      
  }

  detalleOrdenesForm = this.formBuilder.group({
    idOrden: [''],
    codigo: ['', { validators: [Validators.required]}],
    fechaCreacion: ['', { validators: [Validators.required]}],
    valorTotal: ['', { validators: [Validators.required]}],
    estado: ['', { validators: [Validators.required]}]
  });

  ngOnInit() {
    this.sendDetalleOrden.emit(this);
  } 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.orden.currentValue) {

      let orden: InfoOrdenI = changes.orden.currentValue;

      this.detalleOrdenesForm.controls['idOrden'].setValue(orden ? orden.id ? orden.id :"" : "");
      this.detalleOrdenesForm.controls['codigo'].setValue(orden.code);
      this.detalleOrdenesForm.controls['fechaCreacion'].setValue(orden.creationDate);
      this.detalleOrdenesForm.controls['valorTotal'].setValue(orden.total);
      this.detalleOrdenesForm.controls['estado'].setValue(orden.state.value);
      this.lstProductosOrden = orden.products;

    }

    if(this.lstProductosOrden && this.lstProductosOrden.length > 0){
      this.visibilidadTabla = true;
    }else{
      this.visibilidadTabla = false;
    }

    this.totalRecords = this.lstProductosOrden.length;
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.detalleOrdenesForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.detalleOrdenesForm.get(field).dirty || this.detalleOrdenesForm.get(field).touched) && 
            (this.detalleOrdenesForm.get(field).invalid || this.detalleOrdenesForm.get(field).errors?.required));
  }
}