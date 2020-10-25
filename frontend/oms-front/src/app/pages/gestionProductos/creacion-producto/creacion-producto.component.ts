import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProveedoresI } from 'src/app/models/Proveedores';
import { TipoProveedorI } from 'src/app/models/TipoProveedor';

import{FileUploadComponent} from 'src/app/components/file-upload/file-upload.component'
import { TipoProveedorService } from 'src/app/services/comunes/tipo-proveedor.service';
import { ProveedorService } from 'src/app/services/comunes/proveedor.service';
import { ProductoDTO } from 'src/app/models/ProductoDTO';


@Component({
  selector: 'app-creacion-producto',
  templateUrl: './creacion-producto.component.html',
  styles: [],
  providers: [TipoProveedorService, ProveedorService]
})

export class CreacionProductoComponent implements OnInit {

  public listTipoProveedor: TipoProveedorI[];
  public listProveedores: ProveedoresI[];
  public minDate: Date;
  public maxDate: Date;
  public base64: string;
  producto: ProductoDTO;

  @ViewChild(FileUploadComponent) fileUpload;

    constructor(private formBuilder: FormBuilder, 
                private svTipoProveedor: TipoProveedorService,
                private svProveedores: ProveedorService) {
                  
                  //Se establece la fecha minima y maxima
                  const currentYear = new Date().getFullYear();
                  this.minDate = new Date();
                  this.maxDate = new Date(currentYear + 0, 11, 31);
    }
             
    registerProductosForm = this.formBuilder.group({
      tipoProveedor: ['', { validators: [Validators.required]}],
      proveedores: ['', { validators: [Validators.required]}],
      codigo: ['', { validators: [Validators.required]}],
      nombre: ['', { validators: [Validators.required]}],
      descripcion: ['', { validators: [Validators.required]}],
      precio: ['', { validators: [Validators.required]}],
      fechaInicial: ['', { validators: [Validators.required]}],
      fechaFinal: ['', { validators: [Validators.required]}],
      ciudadOrigen: [''],
      ciudadDestino: [''],
      urlImagen: ['']
    });
  
    ngOnInit() {
      this.listTipoProveedor = this.svTipoProveedor.getListTipoProveedor();
  
    }
  
    crearProducto() {
      
      if (!this.registerProductosForm.valid) {
        alert('Alguna regla de validación no se está cumpliendo');
  
        return;
      }

      this.producto.tipoProveedor = this.registerProductosForm.get('tipoProveedor').value;
      this.producto.proveedor = this.registerProductosForm.get('proveedores').value;
      this.producto.codigo = this.registerProductosForm.get('codigo').value;
      this.producto.nombre = this.registerProductosForm.get('nombre').value;
      this.producto.descripcion = this.registerProductosForm.get('descripcion').value;
      this.producto.precio = this.registerProductosForm.get('precio').value;
      this.producto.fechaInicial = this.registerProductosForm.get('fechaInicial').value;
      this.producto.fechaFinal = this.registerProductosForm.get('fechaFinal').value;
      this.producto.ciudadOrigen = this.registerProductosForm.get('ciudadOrigen').value;
      this.producto.ciudadDestino = this.registerProductosForm.get('ciudadDestino').value;
      
      console.log(this.registerProductosForm.value);
      console.log(this.fileUpload.imageURL);
      //let imagenBase64:string; 

      //imagenBase64 = this.fileUpload.fileUploadForm as string;
      //let temBase64: string[];
      //verificar luego
      //temBase64 = imagenBase64.split('data:image/jpeg;base64,');
      //this.base64 = temBase64[1];  
    }
  
    refrescar() {
      this.registerProductosForm.patchValue({
        tipoProveedor: '',
        proveedores: '',
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: '',
        fechaInicial: '',
        fechaFinal: '',
        ciudadOrigen: '',
        ciudadDestino: ''
      });
    }

    //Carga proveedores segun la seleccion de tipo proveedor
    onSelTipoProveedores(value: string): void{
      //Limpiar el campo proveedores
      this.registerProductosForm.patchValue({proveedores: this.listProveedores});

      this.listProveedores = this.svProveedores.getListProveedores().filter(item => item.tipoProveedor == value);
    }
  
    //Metodos Para validacion de campos
    getMensajeError(field:string): string{
      let mensaje: string;
    
      if(this.registerProductosForm.get(field).errors.required){
        mensaje = 'El campo es requerido';
      }
    
      return mensaje;
    }
    
    verificarCampo(field: string): boolean{
      return ((this.registerProductosForm.get(field).dirty || this.registerProductosForm.get(field).touched) && 
              (this.registerProductosForm.get(field).invalid || this.registerProductosForm.get(field).errors?.required));
    }   
  }
