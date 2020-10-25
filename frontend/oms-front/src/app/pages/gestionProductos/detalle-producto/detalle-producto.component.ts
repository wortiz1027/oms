import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProveedoresI } from 'src/app/models/Proveedores';
import { TipoProveedorI } from 'src/app/models/TipoProveedor';
import { ProveedorService } from 'src/app/services/comunes/proveedor.service';
import { TipoProveedorService } from 'src/app/services/comunes/tipo-proveedor.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styles: [],
  providers: [TipoProveedorService, ProveedorService]
})
export class DetalleProductoComponent implements OnInit {

  public listTipoProveedor: TipoProveedorI[];
  public listProveedores: ProveedoresI[];
  public minDate: Date;
  public maxDate: Date;
  public base64: string;

  constructor(private formBuilder: FormBuilder, 
    private svTipoProveedor: TipoProveedorService,
    private svProveedores: ProveedorService) {
      
      //Se establece la fecha minimay maxima
      const currentYear = new Date().getFullYear();
      this.minDate = new Date();
      this.maxDate = new Date(currentYear + 0, 11, 31);
  }

  detalleProductosForm = this.formBuilder.group({
    tipoProveedor: ['', { validators: [Validators.required]}],
    proveedores: ['', { validators: [Validators.required]}],
    codigo: ['', { validators: [Validators.required]}],
    nombre: ['', { validators: [Validators.required]}],
    descripcion: ['', { validators: [Validators.required]}],
    precio: ['', { validators: [Validators.required]}],
    fechaInicial: [''],
    fechaFinal: [''],
    ciudadOrigen: [''],
    ciudadDestino: [''],
    urlImagen: ['']
  });

  ngOnInit() {
    this.listTipoProveedor = this.svTipoProveedor.getListTipoProveedor();

  }

  //Carga proveedores segun la seleccion de tipo proveedor
  onSelTipoProveedores(value: string): void{
    //Limpiar el campo proveedores
    this.detalleProductosForm.patchValue({proveedores: this.listProveedores});

    this.listProveedores = this.svProveedores.getListProveedores().filter(item => item.tipoProveedor == value);
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.detalleProductosForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.detalleProductosForm.get(field).dirty || this.detalleProductosForm.get(field).touched) && 
            (this.detalleProductosForm.get(field).invalid || this.detalleProductosForm.get(field).errors?.required));
  }

}
